import { useState, useEffect } from "react";
import api from "../Router/api";
import UpdateProductForm from "./UpdateProductForm";

const AllProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await api.get("/ecom/products/all?keyword");

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Admin | All Products";

    fetchProducts();
  }, []);

  // Open Update Modal
  const updateProduct = (id) => {
    const product = products.find((p) => p.productId === id);

    setSelectedProduct(product);

    setShowUpdateModal(true);
  };

  // Update Product
  const handleUpdate = async (updatedProduct) => {
    try {
      const response = await api.put(
        `/ecom/products/update/${updatedProduct.productId}`,
        updatedProduct,
      );

      // Update UI immediately
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.productId === updatedProduct.productId ? response.data : p,
        ),
      );

      alert("Product Updated Successfully");

      setShowUpdateModal(false);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Update Failed");
    }
  };

  // Delete Product
  const deleteProduct = async (productId) => {
    const confirmDelete = window.confirm("Delete this product?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/ecom/products/delete/${productId}`);

      setProducts((prev) => prev.filter((p) => p.productId !== productId));

      alert("Product deleted successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  // Search Filter
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      className="container-fluid py-4"
      style={{
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div
        className="rounded-4 shadow-sm p-4 mb-4 text-white"
        style={{
          background: "linear-gradient(135deg, #082b4d, #0d4d85)",
        }}
      >
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="fw-bold mb-1">
              <i className="bi bi-box-seam-fill me-2"></i>
              Product Management
            </h1>

            <p className="mb-0 text-light">Manage all live products easily</p>
          </div>

          <div className="col-md-6 mt-3 mt-md-0">
            <div className="input-group shadow rounded-pill overflow-hidden">
              <span className="input-group-text bg-white border-0">
                <i className="bi bi-search"></i>
              </span>

              <input
                type="text"
                className="form-control border-0 py-3"
                placeholder="Search product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      {showUpdateModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            background: "rgba(0,0,0,0.5)",
            zIndex: 9999,
          }}
        >
          <div className="bg-white rounded-4 shadow-lg p-4">
            <UpdateProductForm
              product={selectedProduct}
              onUpdate={handleUpdate}
              onClose={() => setShowUpdateModal(false)}
            />
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="row g-4">
        {filteredProducts.map((product) => (
          <div className="col-xl-4 col-lg-4 col-md-6" key={product.productId}>
            <div className="card border-0 rounded-4 shadow-sm h-100 overflow-hidden">
              <div
                className="bg-white d-flex justify-content-center align-items-center"
                style={{
                  height: "250px",
                }}
              >
                <img
                  src={`/${product.imageUrl}`}
                  alt={product.name}
                  className="img-fluid"
                  style={{
                    maxHeight: "220px",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="fw-bold">{product.name}</h3>

                  <span className="badge bg-primary rounded-pill px-3 py-2">
                    {product.category}
                  </span>
                </div>

                <p className="text-muted mt-2 mb-1">
                  Product ID:
                  {product.productId}
                </p>

                <p className="text-secondary">
                  {product.description.substring(0, 80)}
                  ...
                </p>

                <h3 className="fw-bold text-success">₹{product.price}</h3>

                <div className="d-flex gap-3 mt-4">
                  <button
                    className="btn btn-warning w-100 rounded-pill fw-bold"
                    onClick={() => updateProduct(product.productId)}
                  >
                    <i className="bi bi-pencil-square me-2"></i>
                    Update
                  </button>

                  <button
                    className="btn btn-danger w-100 rounded-pill fw-bold"
                    onClick={() => deleteProduct(product.productId)}
                  >
                    <i className="bi bi-trash-fill me-2"></i>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProductAdmin;
