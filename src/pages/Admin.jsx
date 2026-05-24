import { useState } from "react";
import AddProduct from "../components/AddProduct";
import AddCustomerAdmin from "../components/AdminUserDetails";
import AddOrderAdmin from "../components/AllOrderAdmin";
import AllProductAdmin from "../components/AllProductAdmin";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [selectedComponent, setSelectedComponent] = useState("dashboard");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminid");
    localStorage.removeItem("adminJwtToken");
    localStorage.removeItem("adminRole");

    alert("Logout Successfully");

    navigate("/admin-login");
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "add-product":
        return <AddProduct />;

      case "all-orders":
        return <AddOrderAdmin />;

      case "add-customer":
        return <AddCustomerAdmin />;

      default:
        return <AllProductAdmin />;
    }
  };

  return (
    <div
      className="container-fluid p-0"
      style={{
        minHeight: "100vh",
        background: "#f4f6f9",
      }}
    >
      {/* Top Navbar */}
      <div
        className="shadow-sm px-4 py-3 d-flex justify-content-between align-items-center"
        style={{
          background: "linear-gradient(to right, #082b4d, #0d4d85)",
        }}
      >
        {/* Left */}
        <div className="d-flex align-items-center">
          <i className="bi bi-speedometer2 text-warning fs-2 me-3"></i>

          <div>
            <h3 className="text-white fw-bold m-0">Admin Dashboard</h3>

            <small className="text-light">Ecommerce Management</small>
          </div>
        </div>

        {/* Right */}
        <button
          className="btn btn-danger rounded-pill px-4 fw-bold"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
      </div>

      {/* Main Layout */}
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-lg-2 col-md-3">
          <div
            className="shadow-sm h-100 p-3"
            style={{
              background: "white",
              minHeight: "100vh",
            }}
          >
            <h5 className="fw-bold mb-4 text-primary">Menu</h5>

            <div className="d-grid gap-3">
              {/* Dashboard */}
              <button
                className={`btn text-start p-3 rounded-4 fw-semibold ${
                  selectedComponent === "dashboard"
                    ? "btn-primary"
                    : "btn-light"
                }`}
                onClick={() => setSelectedComponent("dashboard")}
              >
                <i className="bi bi-grid-fill me-2"></i>
                All Products
              </button>

              {/* Add Product */}
              <button
                className={`btn text-start p-3 rounded-4 fw-semibold ${
                  selectedComponent === "add-product"
                    ? "btn-success"
                    : "btn-light"
                }`}
                onClick={() => setSelectedComponent("add-product")}
              >
                <i className="bi bi-plus-circle-fill me-2"></i>
                Add Product
              </button>

              {/* Orders */}
              <button
                className={`btn text-start p-3 rounded-4 fw-semibold ${
                  selectedComponent === "all-orders"
                    ? "btn-warning"
                    : "btn-light"
                }`}
                onClick={() => setSelectedComponent("all-orders")}
              >
                <i className="bi bi-bag-check-fill me-2"></i>
                View Orders
              </button>

              {/* Customers */}
              <button
                className={`btn text-start p-3 rounded-4 fw-semibold ${
                  selectedComponent === "add-customer"
                    ? "btn-info text-white"
                    : "btn-light"
                }`}
                onClick={() => setSelectedComponent("add-customer")}
              >
                <i className="bi bi-people-fill me-2"></i>
                Customers
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="col-lg-10 col-md-9 p-4">
          <div
            className="bg-white rounded-4 shadow-sm p-4"
            style={{
              minHeight: "90vh",
            }}
          >
            {renderSelectedComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
