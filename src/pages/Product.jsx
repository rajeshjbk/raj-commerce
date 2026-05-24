import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../Router/api";

const Product = () => {
  const [products, setProducts] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [priceOrder, setPriceOrder] = useState("All");

  const [nameSearch, setNameSearch] = useState("");
  const navigate = useNavigate();
  const userid = localStorage.getItem("userid");

  // Filter Function
  const filterProducts = (category, priceOrder, nameSearch, data) => {
    let filtered = [...data];

    // Category Filter
    if (category !== "All") {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Price Sort
    if (priceOrder === "LowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (priceOrder === "HighToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    // Search Filter
    if (nameSearch.trim() !== "") {
      const query = nameSearch.toLowerCase();

      filtered = filtered.filter((product) =>
        product.name?.toLowerCase().includes(query),
      );
    }

    setFilteredProducts(filtered);
  };

  // Fetch Products
  useEffect(() => {
    axios
      .get(
        "https://ecommerce-backend-mhno.onrender.com/ecom/products/all?keyword=",
      )
      .then((response) => {
        setProducts(response.data || []);

        filterProducts(
          selectedCategory,
          priceOrder,
          nameSearch,
          response.data || [],
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedCategory, priceOrder, nameSearch]);

  // Add To Cart
  const addProductToCart = async (productid) => {
    try {
      if (!userid) {
        alert("Please login first");

        navigate("/login");

        return;
      }

      const response = await api.post(
        `/ecom/cart/add-product?userId=${userid}&productId=${productid}`,
      );

      localStorage.setItem("cartid", response.data.cartId);

      alert("Product Added To Cart");
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");

        navigate("/login");
      } else {
        alert(error.response?.data?.message || "Failed to add product");
      }
    }
  };
  return (
    <div className="container-fluid bg-light py-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-3 mb-4">
          <div className="card border-0 shadow rounded-4 p-4 sticky-top">
            <h3 className="fw-bold mb-3 text-primary">
              <i className="bi bi-funnel-fill me-2"></i>
              Filters
            </h3>

            {/* Search */}
            <div className="mb-3">
              <label className="fw-semibold">Search Product</label>

              <div className="input-group mt-2">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name"
                  value={nameSearch}
                  onChange={(e) => setNameSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Category */}
            <div className="mb-3">
              <label className="fw-semibold">Category</label>

              <select
                className="form-select mt-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All</option>
                <option value="vegetables">Vegetable</option>
                <option value="fruits">Fruits</option>
                <option value="electronics">Electronics</option>
                <option value="gadgets">Gadgets</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="fw-semibold">Sort By Price</label>

              <select
                className="form-select mt-2"
                value={priceOrder}
                onChange={(e) => setPriceOrder(e.target.value)}
              >
                <option value="All">Default</option>

                <option value="LowToHigh">Low to High</option>

                <option value="HighToLow">High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="col-lg-9">
          {filteredProducts?.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-search display-1 text-secondary"></i>

              <h2 className="text-success mt-3">Product Not Found</h2>
            </div>
          ) : (
            <div className="row g-4">
              {filteredProducts.map((product) => (
                <div
                  className="col-xl-4 col-lg-6 col-md-6"
                  key={product.productId}
                >
                  <div
                    className="card border-0 shadow rounded-4 h-100 overflow-hidden"
                    style={{
                      transition: "0.3s",
                    }}
                  >
                    {/* Image */}
                    <div
                      className="bg-light d-flex justify-content-center p-3"
                      style={{
                        height: "260px",
                      }}
                    >
                      <img
                        src={`/${product.imageUrl}`}
                        alt={product.name}
                        className="img-fluid"
                        style={{
                          objectFit: "contain",
                          maxHeight: "100%",
                        }}
                      />
                    </div>

                    {/* Body */}
                    <div className="card-body d-flex flex-column">
                      <h5 className="fw-bold">{product.name}</h5>

                      <span className="badge bg-primary mb-2 w-auto">
                        {product.category}
                      </span>

                      <p className="text-muted small">
                        {product.description?.substring(0, 70) ||
                          "No Description"}
                        ...
                      </p>

                      <h4 className="text-success fw-bold">
                        ₹ {product.price}
                      </h4>

                      {/* Rating */}
                      <div className="mb-3">
                        <span className="badge bg-warning text-dark">
                          ⭐{" "}
                          {!product.reviews || product.reviews.length === 0
                            ? "No Rating"
                            : product.reviews[0]?.rating}
                        </span>
                      </div>

                      {/* Buttons */}
                      <div className="mt-auto d-flex gap-2">
                        <button
                          className="btn btn-warning flex-fill fw-semibold"
                          onClick={() => addProductToCart(product.productId)}
                        >
                          <i className="bi bi-cart-plus-fill me-2"></i>
                          Cart
                        </button>

                        <Link
                          to={`/product/${product.productId}`}
                          className="btn btn-primary flex-fill fw-semibold"
                        >
                          <i className="bi bi-eye-fill me-2"></i>
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
