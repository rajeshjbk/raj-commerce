import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import api from "../Router/api";

const SingleProduct = () => {
  const navigate = useNavigate();

  const { productId } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);

  const userid = localStorage.getItem("userid");

  useEffect(() => {
    window.scrollTo(0, 0);

    api
      .get(`/ecom/products/${productId}`)
      .then((response) => {
        setProduct(response.data);

        setLoading(false);
      })
      .catch((error) => {
        console.error(error);

        setLoading(false);
      });
  }, [productId]);

  const addProductToCart = async (productid) => {
    try {
      const response = await api.post(
        `/ecom/cart/add-product?userId=${userid}&productId=${productid}`,
      );

      localStorage.setItem("cartid", response.data.cartId);

      alert("Product Added To Cart");
    } catch (error) {
      console.log(error);

      const status = error.response?.status;

      const message = error.response?.data?.message;

      if (status === 400 || message?.toLowerCase().includes("already")) {
        alert("Product Already In Cart");
      } else if (status === 401) {
        alert("Please Login First");

        navigate("/login");
      } else {
        alert("Something went wrong");
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary"></div>

          <h4 className="mt-3">Loading Product...</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card border-0 shadow-lg rounded-5 overflow-hidden">
        <div className="row g-0">
          {/* Product Image */}
          <div className="col-lg-5 bg-light d-flex justify-content-center align-items-center p-4">
            <img
              src={"/" + product.imageUrl}
              alt={product.name}
              className="img-fluid rounded-4 shadow-sm"
              style={{
                maxHeight: "450px",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Product Details */}
          <div className="col-lg-7">
            <div className="p-5">
              {/* Category */}
              <span className="badge bg-primary px-3 py-2 rounded-pill mb-3">
                {product.category}
              </span>

              {/* Name */}
              <h1 className="fw-bold text-dark mb-3">{product.name}</h1>

              {/* Rating */}
              <div className="mb-3">
                <span className="badge bg-success px-3 py-2">★ 4.5</span>

                <span className="ms-2 text-muted">Trusted Product</span>
              </div>

              {/* Price */}
              <h2 className="text-success fw-bold mb-4">₹{product.price}</h2>

              {/* Description */}
              <div className="mb-4">
                <h5 className="fw-bold">Description</h5>

                <p className="text-muted">{product.description}</p>
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <label className="fw-bold me-3">Quantity</label>

                <div className="d-inline-flex align-items-center border rounded-pill overflow-hidden">
                  <button
                    className="btn btn-light"
                    disabled={quantity === 1}
                    onClick={() => setQuantity(quantity - 1)}
                  >
                    -
                  </button>

                  <span className="px-4 fw-bold">{quantity}</span>

                  <button
                    className="btn btn-light"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex gap-3 flex-wrap">
                <button
                  className="btn btn-warning px-5 py-3 fw-bold rounded-pill shadow"
                  onClick={() => addProductToCart(product.productId)}
                >
                  <i className="bi bi-cart-plus-fill me-2"></i>
                  Add To Cart
                </button>

                <button
                  className="btn btn-primary px-5 py-3 fw-bold rounded-pill shadow"
                  onClick={() => navigate("/user/cart")}
                >
                  <i className="bi bi-bag-check-fill me-2"></i>
                  Move To Cart
                </button>
              </div>

              {/* Extra Info */}
              <div className="mt-5 border-top pt-4">
                <div className="row text-center">
                  <div className="col-md-4 mb-3">
                    <i className="bi bi-truck fs-2 text-primary"></i>

                    <h6 className="fw-bold mt-2">Fast Delivery</h6>
                  </div>

                  <div className="col-md-4 mb-3">
                    <i className="bi bi-arrow-repeat fs-2 text-success"></i>

                    <h6 className="fw-bold mt-2">Easy Returns</h6>
                  </div>

                  <div className="col-md-4 mb-3">
                    <i className="bi bi-shield-check fs-2 text-danger"></i>

                    <h6 className="fw-bold mt-2">Secure Payment</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
