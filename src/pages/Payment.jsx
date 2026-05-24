import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../Router/api";
import successtBg from "../picture/successbg.webp";

const Payment = () => {
  const [paymentData, setPaymentData] = useState(null);

  const [loading, setLoading] = useState(true);

  const userid = localStorage.getItem("userid");

  const orderid = localStorage.getItem("orderid");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Ecommerce | Payment Success";

    const makePayment = async () => {
      try {
        const response = await api.post(
          `/ecom/order-payment/makePayment?orderId=${orderid}&userId=${userid}`,
        );

        setPaymentData(response.data);
      } catch (error) {
        console.error("Payment Error:", error);

        alert("Payment failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    makePayment();

    // Redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [userid, orderid, navigate]);

  // Loading Screen
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <div
            className="spinner-border text-success"
            style={{
              width: "4rem",
              height: "4rem",
            }}
          ></div>

          <h3 className="mt-4 fw-bold text-success">Processing Payment...</h3>

          <p className="text-muted">
            Please wait while we confirm your payment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center py-5"
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${successtBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="card border-0 shadow-lg rounded-5 overflow-hidden"
        style={{
          maxWidth: "850px",
          width: "100%",
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.96)",
        }}
      >
        {/* Header */}
        <div
          className="text-center py-5 text-white"
          style={{
            background: "linear-gradient(to right, #16a34a, #22c55e)",
          }}
        >
          <div
            className="bg-white rounded-circle d-flex justify-content-center align-items-center mx-auto shadow"
            style={{
              width: "100px",
              height: "100px",
            }}
          >
            <i
              className="bi bi-check-circle-fill text-success"
              style={{
                fontSize: "55px",
              }}
            ></i>
          </div>

          <h1 className="fw-bold mt-4">Payment Successful</h1>

          <p className="mb-0 fs-5">Thank you for shopping with Raj-Commerce</p>
        </div>

        {/* Body */}
        <div className="card-body p-5">
          <div className="row g-4">
            {/* User Details */}
            <div className="col-md-6">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body">
                  <h4 className="fw-bold text-primary mb-4">
                    <i className="bi bi-person-circle me-2"></i>
                    Customer Details
                  </h4>

                  <p>
                    <strong>Name:</strong> {paymentData?.user?.firstName}{" "}
                    {paymentData?.user?.lastName}
                  </p>

                  <p>
                    <strong>Email:</strong> {paymentData?.user?.email}
                  </p>

                  <p>
                    <strong>Phone:</strong> {paymentData?.user?.phoneNumber}
                  </p>

                  <p>
                    <strong>User ID:</strong> {paymentData?.user?.userId}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="col-md-6">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body">
                  <h4 className="fw-bold text-success mb-4">
                    <i className="bi bi-credit-card-fill me-2"></i>
                    Payment Details
                  </h4>

                  <p>
                    <strong>Payment ID:</strong> {paymentData?.paymentId}
                  </p>

                  <p>
                    <strong>Amount:</strong>{" "}
                    <span className="fw-bold text-success">
                      ₹{paymentData?.paymentAmount}
                    </span>
                  </p>

                  <p>
                    <strong>Method:</strong> {paymentData?.paymentMethod}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="badge bg-success px-3 py-2">
                      {paymentData?.paymentStatus}
                    </span>
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {paymentData?.paymentDate
                      ? new Date(paymentData.paymentDate).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-5">
            <h4 className="fw-bold text-success">🎉 Order Confirmed</h4>

            <p className="text-muted fs-5">
              Thanks for shopping with us. Visit again!
            </p>

            <div className="alert alert-info rounded-pill d-inline-block px-4">
              Redirecting to homepage in <strong>5 seconds</strong>
              ...
            </div>

            <div className="mt-4">
              <button
                className="btn btn-primary rounded-pill px-5 py-2 fw-bold shadow"
                onClick={() => navigate("/")}
              >
                <i className="bi bi-house-fill me-2"></i>
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
