import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "85vh",
        background: "linear-gradient(to right, #f8f9fa, #eef4ff)",
      }}
    >
      <div className="text-center">
        {/* Icon */}
        <div
          className="mx-auto mb-4 d-flex justify-content-center align-items-center shadow-lg"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #082b4d, #0d6efd)",
          }}
        >
          <i className="bi bi-cart-x text-white display-1"></i>
        </div>

        {/* 404 */}
        <h1
          className="fw-bold"
          style={{
            fontSize: "90px",
            color: "#082b4d",
          }}
        >
          404
        </h1>

        {/* Heading */}
        <h2 className="fw-bold text-dark mb-3">Oops! Page Not Found</h2>

        <p
          className="text-muted mx-auto"
          style={{
            maxWidth: "500px",
            fontSize: "18px",
          }}
        >
          Sorry, the page you are looking for doesn’t exist or may have been
          moved.
        </p>

        {/* Buttons */}
        <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
          <button
            className="btn btn-primary px-4 py-2 rounded-pill shadow"
            onClick={() => navigate("/")}
          >
            <i className="bi bi-house-door-fill me-2"></i>
            Go Home
          </button>

          <button
            className="btn btn-warning px-4 py-2 rounded-pill shadow fw-bold"
            onClick={() => navigate("/products")}
          >
            <i className="bi bi-cart-fill me-2"></i>
            Continue Shopping
          </button>
        </div>

        {/* Bottom Text */}
        <div className="mt-5">
          <h4
            className="fw-bold"
            style={{
              color: "#082b4d",
            }}
          >
            Raj-Commerce
          </h4>

          <small className="text-muted">Shop Smart, Save More</small>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
