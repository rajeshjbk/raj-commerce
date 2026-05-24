import { useState } from "react";

import { useNavigate } from "react-router-dom";

import paymentBg from "../picture/paymentbg.webp";

const PaymentForm = () => {
  const navigate = useNavigate();

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Card Number Formatting
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\D/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();

      setPaymentData({
        ...paymentData,
        [name]: formatted,
      });

      return;
    }

    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(paymentData);

    navigate("/user/payment-success");
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center py-5"
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${paymentBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="row w-100 justify-content-center">
        <div className="col-lg-10">
          <div className="card border-0 shadow-lg rounded-5 overflow-hidden">
            <div className="row g-0">
              {/* Left Side Card */}
              <div
                className="col-lg-5 text-white p-5 d-flex flex-column justify-content-between"
                style={{
                  background: "linear-gradient(135deg, #082b4d, #0d6efd)",
                }}
              >
                <div>
                  <h2 className="fw-bold">
                    <i className="bi bi-shield-lock-fill me-2"></i>
                    Secure Payment
                  </h2>

                  <p className="opacity-75">
                    Your payment information is encrypted and secure.
                  </p>
                </div>

                {/* Credit Card Preview */}
                <div
                  className="rounded-5 p-4 shadow-lg"
                  style={{
                    background: "linear-gradient(135deg,#1e293b,#334155)",
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <i className="bi bi-credit-card-2-front-fill fs-2"></i>

                    <i className="bi bi-wifi fs-3"></i>
                  </div>

                  <h4 className="mt-4 letter-spacing">
                    {paymentData.cardNumber || "**** **** **** ****"}
                  </h4>

                  <div className="d-flex justify-content-between mt-4">
                    <div>
                      <small>CARD HOLDER</small>

                      <h6>{paymentData.cardHolder || "YOUR NAME"}</h6>
                    </div>

                    <div>
                      <small>EXPIRES</small>

                      <h6>{paymentData.expirationDate || "MM/YY"}</h6>
                    </div>
                  </div>
                </div>

                <small className="opacity-75 mt-4">
                  <i className="bi bi-lock-fill me-2"></i>
                  100% Secure SSL Protected Payment
                </small>
              </div>

              {/* Right Side Form */}
              <div className="col-lg-7 p-5 bg-white">
                <h2 className="fw-bold text-dark mb-4">Payment Information</h2>

                <form onSubmit={handleSubmit}>
                  {/* Card Number */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Card Number
                    </label>

                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-credit-card"></i>
                      </span>

                      <input
                        type="text"
                        className="form-control"
                        name="cardNumber"
                        maxLength={19}
                        value={paymentData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                  </div>

                  {/* Card Holder */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Card Holder
                    </label>

                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-person-fill"></i>
                      </span>

                      <input
                        type="text"
                        className="form-control"
                        name="cardHolder"
                        value={paymentData.cardHolder}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  {/* Expiry + CVV */}
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">
                        Expiry Date
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="expirationDate"
                        value={paymentData.expirationDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">CVV</label>

                      <div className="input-group">
                        <input
                          type="password"
                          className="form-control"
                          name="cvv"
                          maxLength={3}
                          value={paymentData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          required
                        />

                        <span className="input-group-text">
                          <i className="bi bi-lock-fill"></i>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    className="btn btn-success w-100 py-3 rounded-4 fw-bold shadow"
                  >
                    <i className="bi bi-credit-card-fill me-2"></i>
                    Make Secure Payment
                  </button>

                  <p className="text-center text-muted mt-3">
                    Secured by Raj-Commerce Payment Gateway
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
