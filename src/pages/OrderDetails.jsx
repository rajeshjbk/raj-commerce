import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../Router/api";

const OrderDetails = () => {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userid");

  const [deleted, setDeleted] = useState(false);

  const [allOrder, setAllOrder] = useState([]);

  const handleMakePayment = (orderId) => {
    localStorage.setItem("orderid", orderId);

    navigate("/user/make-payment");
  };

  const handleProfileSection = (userid) => {
    navigate(`/user/profile/${userid}`);
  };

  const handleDeleteOrder = (orderId) => {
    api
      .delete(`/ecom/orders/delete/${userId}/${orderId}`)
      .then((response) => {
        alert(response.data);

        const updatedOrders = allOrder.filter(
          (order) => order.orderId !== orderId,
        );

        setAllOrder(updatedOrders);

        setDeleted(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    document.title = "Ecommerce | Order Details";

    api
      .get(`/ecom/orders/user/${userId}`)
      .then((response) => {
        const orders = Array.isArray(response.data)
          ? response.data
          : response.data.orders || [];

        const sortedOrders = orders.sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate),
        );

        setAllOrder(sortedOrders);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [deleted, userId]);

  return (
    <div className="container py-4">
      <div className="row">
        {/* Orders */}
        <div className="col-lg-9">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
            <h2 className="fw-bold text-dark">
              <i className="bi bi-bag-check-fill text-primary me-2"></i>
              My Orders
            </h2>

            <button
              className="btn btn-outline-primary rounded-pill px-4"
              onClick={() => navigate("/products")}
            >
              <i className="bi bi-cart-plus me-2"></i>
              Continue Shopping
            </button>
          </div>

          {allOrder.length > 0 ? (
            allOrder.map((order, index) => (
              <div
                key={order.orderId}
                className="card border-0 shadow-lg rounded-4 mb-4"
              >
                <div className="card-body p-4">
                  {/* Top */}
                  <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                    <div>
                      <h5 className="fw-bold">Order #{index + 1}</h5>

                      <p className="text-muted mb-1">ID: {order.orderId}</p>

                      <small className="text-secondary">
                        {new Date(order.orderDate).toLocaleString()}
                      </small>
                    </div>

                    <div className="text-end">
                      <span
                        className={`badge fs-6 px-3 py-2 rounded-pill ${
                          order.orderStatus === "SHIPPED"
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {order.orderStatus}
                      </span>

                      <h4 className="text-success fw-bold mt-2">
                        ₹{order.totalAmount}
                      </h4>
                    </div>
                  </div>

                  <hr />

                  {/* Products */}
                  <div>
                    <h6 className="fw-bold mb-3">Ordered Products</h6>

                    {order.orderItem?.map((item) => (
                      <div
                        key={item.orderItemId}
                        className="d-flex align-items-center justify-content-between bg-light rounded-4 p-3 mb-2"
                      >
                        <div className="d-flex align-items-center">
                          <img
                            src={"/" + item.product?.imageUrl}
                            alt=""
                            className="rounded-3 me-3"
                            style={{
                              width: "70px",
                              height: "70px",
                              objectFit: "cover",
                            }}
                          />

                          <div>
                            <h6 className="mb-1 fw-bold">
                              {item.product?.name}
                            </h6>

                            <small className="text-muted">
                              Qty: {item.quantity}
                            </small>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="d-flex gap-3 mt-4 flex-wrap">
                    {order.orderStatus === "SHIPPED" ? (
                      <button className="btn btn-success rounded-pill px-4">
                        <i className="bi bi-truck me-2"></i>
                        Shipped
                      </button>
                    ) : (
                      <>
                        <button
                          className="btn btn-danger rounded-pill px-4"
                          onClick={() => handleDeleteOrder(order.orderId)}
                        >
                          <i className="bi bi-x-circle me-2"></i>
                          Cancel Order
                        </button>

                        <button
                          className="btn btn-primary rounded-pill px-4"
                          onClick={() => handleMakePayment(order.orderId)}
                        >
                          <i className="bi bi-credit-card me-2"></i>
                          Make Payment
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card border-0 shadow-lg rounded-4 text-center py-5">
              <i className="bi bi-bag-x text-secondary display-1"></i>

              <h2 className="fw-bold mt-3">No Orders Found</h2>

              <p className="text-muted">You haven't placed any orders yet.</p>

              <div>
                <button
                  className="btn btn-warning px-4 rounded-pill fw-bold"
                  onClick={() => navigate("/products")}
                >
                  Shop Now
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-lg-3">
          <div className="card border-0 shadow-lg rounded-4 p-4 sticky-top">
            <div className="text-center">
              <i className="bi bi-person-circle text-primary display-4"></i>

              <h4 className="fw-bold mt-2">Profile</h4>

              <p className="text-muted">Manage your account</p>

              <button
                className="btn btn-primary w-100 rounded-pill"
                onClick={() => handleProfileSection(userId)}
              >
                <i className="bi bi-person me-2"></i>
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
