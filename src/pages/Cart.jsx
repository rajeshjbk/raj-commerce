import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Router/api";

const Cart = () => {
  const navigate = useNavigate();

  const [cartData, setCartData] = useState({
    cartItems: [],
  });

  const [totalAmount, setTotalAmount] = useState(0);

  const cartId = localStorage.getItem("cartid");
  const userId = localStorage.getItem("userid");

  const fetchCartData = async () => {
    try {
      if (!cartId) return;

      const response = await api.get(`/ecom/cart/products/${cartId}`);

      setCartData(response.data);
      setTotalAmount(response.data.totalAmount || 0);

      // save cart count
      const totalItems =
        response.data.cartItems?.reduce(
          (sum, item) => sum + item.quantity,
          0,
        ) || 0;

      localStorage.setItem("cartCount", totalItems);

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        alert("Please login again");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    document.title = "Ecommerce | Cart";

    if (!userId) {
      navigate("/login");
      return;
    }

    fetchCartData();
  }, []);

  const orderPlaced = async () => {
    try {
      await api.post(`/ecom/orders/placed/${userId}`);

      alert("Order Placed Successfully");

      localStorage.setItem("cartCount", 0);

      setCartData({
        cartItems: [],
      });

      setTotalAmount(0);

      window.dispatchEvent(new Event("cartUpdated"));

      navigate("/user/order-details");
    } catch (error) {
      console.error(error);
    }
  };

  const emptyCart = async () => {
    try {
      await api.delete(`/ecom/cart/remove-all-product/${cartId}`);

      localStorage.setItem("cartCount", 0);

      setCartData({
        cartItems: [],
      });

      setTotalAmount(0);

      window.dispatchEvent(new Event("cartUpdated"));

      alert("Cart Emptied Successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to empty cart");
    }
  };

  const removeProductfromCart = async (productid) => {
    try {
      await api.delete(`/ecom/cart/remove-product/${cartId}/${productid}`);

      fetchCartData();
    } catch (error) {
      alert("Failed to remove product");
    }
  };

  const increaseCount = async (productid) => {
    try {
      await api.put(`/ecom/cart/increase-productQty/${userId}/${productid}`);

      fetchCartData();
    } catch (error) {
      alert("Cannot increase quantity");
    }
  };

  const decreaseCount = async (productid) => {
    try {
      await api.put(`/ecom/cart/decrease-productQty/${userId}/${productid}`);

      fetchCartData();
    } catch (error) {
      alert("Cannot decrease quantity");
    }
  };

  return (
    <div
      className="container-fluid py-4"
      style={{
        background: "linear-gradient(to right,#f5f7fa,#e9eef5)",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <h2 className="fw-bold mb-4">
          <i className="bi bi-cart3 text-primary me-2"></i>
          My Shopping Cart
        </h2>

        {cartData.cartItems?.length > 0 ? (
          <div className="row g-4">
            {/* Products */}
            <div className="col-lg-8">
              {cartData.cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="card border-0 shadow rounded-4 mb-4 overflow-hidden"
                >
                  <div className="row g-0 align-items-center p-3">
                    <div className="col-md-3 text-center">
                      <img
                        src={`/${item.product.imageUrl}`}
                        alt={item.product.name}
                        className="img-fluid rounded-4"
                        style={{
                          height: "180px",
                          objectFit: "contain",
                        }}
                      />
                    </div>

                    <div className="col-md-9">
                      <div className="card-body">
                        <h3 className="fw-bold">{item.product.name}</h3>

                        <span className="badge bg-primary px-3 py-2 mb-2 rounded-pill">
                          {item.product.category}
                        </span>

                        <p className="text-muted">{item.product.description}</p>

                        <h3 className="text-success fw-bold">
                          ₹{item.product.price}
                        </h3>

                        <p className="fw-semibold text-dark">
                          Subtotal:
                          <span className="text-success ms-2">
                            ₹{item.product.price * item.quantity}
                          </span>
                        </p>

                        <div className="d-flex align-items-center gap-3 mt-3">
                          <button
                            className="btn btn-outline-danger rounded-circle"
                            onClick={() =>
                              decreaseCount(item.product.productId)
                            }
                          >
                            <i className="bi bi-dash-lg"></i>
                          </button>

                          <span className="fs-4 fw-bold">{item.quantity}</span>

                          <button
                            className="btn btn-outline-success rounded-circle"
                            onClick={() =>
                              increaseCount(item.product.productId)
                            }
                          >
                            <i className="bi bi-plus-lg"></i>
                          </button>

                          <button
                            className="btn btn-danger ms-4 rounded-pill px-4"
                            onClick={() =>
                              removeProductfromCart(item.product.productId)
                            }
                          >
                            <i className="bi bi-trash-fill me-2"></i>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="col-lg-4">
              <div
                className="card border-0 shadow-lg rounded-4 p-4 sticky-top"
                style={{
                  top: "100px",
                }}
              >
                <h3 className="fw-bold mb-4 text-center">Order Summary</h3>

                <div className="d-flex justify-content-between mb-3">
                  <span className="fw-semibold">Total Amount</span>

                  <h3 className="text-success fw-bold">₹{totalAmount}</h3>
                </div>

                <button
                  className="btn btn-success w-100 py-3 fw-bold rounded-pill mb-3"
                  onClick={orderPlaced}
                >
                  <i className="bi bi-bag-check-fill me-2"></i>
                  Place Order
                </button>

                <button
                  className="btn btn-danger w-100 py-3 rounded-pill mb-3"
                  onClick={emptyCart}
                >
                  <i className="bi bi-trash-fill me-2"></i>
                  Empty Cart
                </button>

                <button
                  className="btn btn-primary w-100 py-3 rounded-pill mb-3"
                  onClick={() => navigate("/user/order-details")}
                >
                  <i className="bi bi-box-seam me-2"></i>
                  Order Page
                </button>

                {/* Add More Products */}
                <button
                  className="btn w-100 py-3 rounded-pill fw-bold text-white border-0 shadow"
                  style={{
                    background: "linear-gradient(135deg, #ff9800, #ff5722)",
                  }}
                  onClick={() => navigate("/products")}
                >
                  <i className="bi bi-bag-plus-fill me-2"></i>
                  Add More Products
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-5">
            <i className="bi bi-cart-x display-1 text-secondary"></i>

            <h1 className="fw-bold mt-3">Your Cart is Empty</h1>

            <p className="text-muted">
              Looks like you haven’t added anything yet.
            </p>

            <Link
              to="/products"
              className="btn btn-warning px-5 py-3 rounded-pill fw-bold shadow"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
