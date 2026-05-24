import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const userId = localStorage.getItem("userid");
  const name = localStorage.getItem("name");

  const handleLogoutClick = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("name");
    localStorage.removeItem("orderid");

    alert("Logout Successfully");
    navigate("/");
  };

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/products?keyword=${search}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top shadow-sm px-lg-5 px-3 py-3"
      style={{
        background: "linear-gradient(to right, #082b4d, #0d3d68)",
      }}
    >
      <div className="container-fluid">
        {/* Logo */}
        <div
          className="d-flex align-items-center"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <i className="bi bi-bag-heart-fill text-warning fs-2 me-2"></i>
          <h2 className="text-white fw-bold m-0">Raj-Commerce</h2>
        </div>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Search Bar */}
          <div
            className="mx-auto my-3 my-lg-0"
            style={{
              width: "100%",
              maxWidth: "650px",
            }}
          >
            <div
              className="input-group shadow rounded-pill overflow-hidden"
              style={{
                background: "#fff",
              }}
            >
              {/* Search Icon */}
              <span className="input-group-text bg-white border-0 px-3">
                <i className="bi bi-search text-primary fs-5"></i>
              </span>

              {/* Input */}
              <input
                type="text"
                className="form-control border-0 py-2 px-2"
                placeholder="Search product by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                style={{
                  boxShadow: "none",
                }}
              />

              {/* Search Button */}
              <button
                className="btn fw-semibold px-4 text-white"
                style={{
                  background: "linear-gradient(135deg, #ff9800, #ff5722)",
                  borderRadius: "0 50px 50px 0",
                }}
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-3 text-white">
            {/* Cart */}
            <button
              className="btn btn-outline-light rounded-pill px-3 d-flex align-items-center"
              onClick={() => navigate("/user/cart")}
            >
              <i className="bi bi-cart3 me-2"></i>
              Cart
            </button>

            {userId ? (
              <>
                <button
                  className="btn btn-light rounded-pill d-flex align-items-center px-3 shadow-sm"
                  onClick={() => navigate("/user/order-details")}
                >
                  <i className="bi bi-person-circle me-2"></i>
                  {name}
                </button>

                <button
                  className="btn btn-danger rounded-pill px-3 shadow-sm"
                  onClick={handleLogoutClick}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn px-4 py-2 fw-bold border-0 shadow-sm d-flex align-items-center"
                  style={{
                    background: "linear-gradient(135deg, #ffffff, #e9ecef)",
                    color: "#082b4d",
                    borderRadius: "12px",
                  }}
                  onClick={() => navigate("/login")}
                >
                  <i className="bi bi-box-arrow-in-right me-2 fs-5"></i>
                  Login
                </button>

                <button
                  className="btn px-4 py-2 fw-bold text-white border-0 shadow-sm d-flex align-items-center"
                  style={{
                    background: "linear-gradient(135deg, #ff9800, #ff5722)",
                    borderRadius: "12px",
                  }}
                  onClick={() => navigate("/register-user")}
                >
                  <i className="bi bi-person-plus-fill me-2 fs-5"></i>
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
