import { useEffect, useState } from "react";

import api from "../Router/api";

const AddOrderAdmin = () => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/ecom/orders/all")
      .then((response) => {
        setOrders(response.data || []);

        setLoading(false);
      })
      .catch((error) => {
        console.error(error);

        setLoading(false);
      });
  }, []);

  return (
    <div className="container-fluid py-4">
      {/* Heading */}
      <div className="text-center mb-4">
        <h1 className="fw-bold text-dark">
          <i className="bi bi-bag-check-fill text-primary me-2"></i>
          All Orders
        </h1>

        <p className="text-muted">Manage customer orders and payments</p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary"></div>

          <p className="mt-3">Loading Orders...</p>
        </div>
      ) : orders.length > 0 ? (
        <div className="row g-4">
          {orders.map((order) => (
            <div className="col-12" key={order.orderId}>
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="card-body p-4">
                  <div className="row">
                    {/* Order Details */}
                    <div className="col-lg-4 border-end">
                      <h4 className="fw-bold mb-3">
                        <i className="bi bi-box-seam text-primary me-2"></i>
                        Order Details
                      </h4>

                      <p>
                        <strong>Order ID:</strong> {order.orderId}
                      </p>

                      <p>
                        <strong>Date:</strong>{" "}
                        {order.orderDate
                          ? new Date(order.orderDate).toLocaleString()
                          : "N/A"}
                      </p>

                      <p>
                        <strong>Status:</strong>{" "}
                        <span
                          className={`badge px-3 py-2 ${
                            order.orderStatus === "SHIPPED"
                              ? "bg-success"
                              : order.orderStatus === "DELIVERED"
                                ? "bg-primary"
                                : "bg-warning text-dark"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </p>

                      <h5 className="text-success fw-bold mt-3">
                        ₹{order.totalAmount || 0}
                      </h5>
                    </div>

                    {/* Products */}
                    <div className="col-lg-4 border-end">
                      <h4 className="fw-bold mb-3">
                        <i className="bi bi-cart-fill text-success me-2"></i>
                        Products
                      </h4>

                      {order.orderItem?.length > 0 ? (
                        order.orderItem.map((item) => (
                          <div
                            key={item.orderItemId}
                            className="d-flex align-items-center bg-light rounded-4 p-2 mb-3 shadow-sm"
                          >
                            <img
                              src={"/" + item.product?.imageUrl}
                              alt=""
                              className="rounded-3"
                              style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                              }}
                            />

                            <div className="ms-3">
                              <h6 className="fw-bold mb-1">
                                {item.product?.name}
                              </h6>

                              <p className="mb-1 text-muted">
                                Qty: {item.quantity}
                              </p>

                              <h6 className="text-success mb-0">
                                ₹{item.product?.price || 0}
                              </h6>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No products found</p>
                      )}
                    </div>

                    {/* Customer & Payment */}
                    <div className="col-lg-4">
                      <h4 className="fw-bold mb-3">
                        <i className="bi bi-person-fill text-danger me-2"></i>
                        Customer Details
                      </h4>

                      <div className="bg-light rounded-4 p-3 mb-3">
                        <p>
                          <strong>User ID:</strong>{" "}
                          {order.payment?.user?.userId || "N/A"}
                        </p>

                        <p>
                          <strong>Name:</strong>{" "}
                          {order.payment?.user
                            ? `${order.payment.user.firstName} ${order.payment.user.lastName}`
                            : "N/A"}
                        </p>

                        <p>
                          <strong>Phone:</strong>{" "}
                          {order.payment?.user?.phoneNumber || "N/A"}
                        </p>
                      </div>

                      <h4 className="fw-bold mb-3">
                        <i className="bi bi-credit-card-fill text-warning me-2"></i>
                        Payment
                      </h4>

                      {order.payment ? (
                        <div className="bg-light rounded-4 p-3">
                          <p>
                            <strong>Payment ID:</strong>{" "}
                            {order.payment.paymentId}
                          </p>

                          <p>
                            <strong>Method:</strong>{" "}
                            {order.payment.paymentMethod}
                          </p>

                          <p>
                            <strong>Amount:</strong> ₹
                            {order.payment.paymentAmount}
                          </p>

                          <p>
                            <strong>Status:</strong>{" "}
                            <span className="badge bg-success">
                              {order.payment.paymentStatus}
                            </span>
                          </p>

                          <p className="mb-0">
                            <strong>Date:</strong>{" "}
                            {order.payment.paymentDate
                              ? new Date(
                                  order.payment.paymentDate,
                                ).toLocaleString()
                              : "N/A"}
                          </p>
                        </div>
                      ) : (
                        <div className="alert alert-warning">
                          No Payment Information
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <i className="bi bi-cart-x display-1 text-secondary"></i>

          <h3 className="mt-3">No Orders Found</h3>

          <p className="text-muted">No customer orders available.</p>
        </div>
      )}
    </div>
  );
};

export default AddOrderAdmin;
