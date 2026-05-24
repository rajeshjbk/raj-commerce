import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="text-light py-4"
      style={{
        background: "linear-gradient(to right, #0f172a, #1e293b)",
      }}
    >
      <div className="container-lg" style={{ maxWidth: "1200px" }}>
        <div className="row gy-4">
          {/* Company */}
          <div className="col-lg-3 col-md-6">
            <h4 className="fw-bold text-warning">
              <i className="bi bi-bag-heart-fill me-2"></i>
              Raj-Commerce
            </h4>

            <p
              className="text-light-emphasis small"
              style={{
                maxWidth: "260px",
              }}
            >
              Trusted ecommerce platform for groceries, electronics and fashion.
            </p>

            <div className="d-flex gap-3 fs-4">
              <i className="bi bi-facebook text-primary"></i>

              <i className="bi bi-instagram text-danger"></i>

              <i className="bi bi-twitter-x text-info"></i>

              <i className="bi bi-linkedin text-primary"></i>
            </div>
          </div>

          {/* Policy */}
          <div className="col-lg-2 col-md-6">
            <h5 className="text-warning fw-bold">Policy</h5>

            <ul className="list-unstyled small">
              <li>Privacy Policy</li>
              <li>Terms of Sale</li>
              <li>Terms of Use</li>
              <li>FAQ</li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-lg-2 col-md-6">
            <h5 className="text-warning fw-bold">Company</h5>

            <ul className="list-unstyled small">
              <li>Careers</li>
              <li>Blog</li>
              <li>Contact</li>
              <li>Sitemap</li>
            </ul>
          </div>

          {/* Popular */}
          <div className="col-lg-2 col-md-6">
            <h5 className="text-warning fw-bold">Popular</h5>

            <ul className="list-unstyled small">
              <li>Electronics</li>
              <li>Groceries</li>
              <li>Fruits</li>
              <li>Fashion</li>
            </ul>
          </div>

          {/* Subscribe */}
          <div className="col-lg-3 col-md-12">
            <h5 className="text-warning fw-bold">Subscribe</h5>

            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text bg-warning border-0">
                <i className="bi bi-envelope-fill"></i>
              </span>

              <input
                type="email"
                className="form-control border-0"
                placeholder="Email"
              />

              <button className="btn btn-warning fw-bold">Join</button>
            </div>

            <Link
              to="/admin-Login"
              className="btn btn-outline-warning btn-sm rounded-pill"
            >
              <i className="bi bi-shield-lock-fill me-2"></i>
              Admin Access
            </Link>
          </div>
        </div>

        <hr className="border-secondary my-3" />

        {/* Bottom */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <small className="text-light-emphasis">© 2026 Raj-Commerce</small>

          <div className="d-flex gap-3 fs-5">
            <i className="bi bi-credit-card text-success"></i>

            <i className="bi bi-paypal text-info"></i>

            <i className="bi bi-wallet2 text-warning"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
