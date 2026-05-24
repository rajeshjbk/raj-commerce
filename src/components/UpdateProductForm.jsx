import { useState } from "react";

const UpdateProductForm = ({ product, onUpdate, onClose }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    ...product,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdatedProduct({
      ...updatedProduct,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdate(updatedProduct);
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        background: "rgba(0,0,0,0.55)",
        zIndex: 9999,
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="card border-0 shadow-lg rounded-4 overflow-hidden"
        style={{
          width: "700px",
          maxWidth: "95%",
        }}
      >
        {/* Header */}
        <div
          className="text-white p-4"
          style={{
            background: "linear-gradient(to right, #082b4d, #0d6efd)",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="fw-bold m-0">
              <i className="bi bi-pencil-square me-2"></i>
              Update Product
            </h2>

            <button className="btn btn-light rounded-circle" onClick={onClose}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Product Name */}
              <div className="col-md-6 mb-4">
                <label className="fw-semibold mb-2">Product Name</label>

                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-box-seam"></i>
                  </span>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={updatedProduct.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Price */}
              <div className="col-md-6 mb-4">
                <label className="fw-semibold mb-2">Price</label>

                <div className="input-group">
                  <span className="input-group-text">₹</span>

                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={updatedProduct.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="col-12 mb-4">
                <label className="fw-semibold mb-2">Image URL</label>

                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-image"></i>
                  </span>

                  <input
                    type="text"
                    name="imageUrl"
                    className="form-control"
                    value={updatedProduct.imageUrl}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Category */}
              <div className="col-md-6 mb-4">
                <label className="fw-semibold mb-2">Category</label>

                <select
                  name="category"
                  className="form-select"
                  value={updatedProduct.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>

                  <option value="fruits">Fruits</option>

                  <option value="vegetables">Vegetables</option>

                  <option value="electronics">Electronics</option>

                  <option value="gadgets">Gadgets</option>
                </select>
              </div>

              {/* Description */}
              <div className="col-12 mb-4">
                <label className="fw-semibold mb-2">Description</label>

                <textarea
                  rows="4"
                  name="description"
                  className="form-control"
                  value={updatedProduct.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-end gap-3 mt-3">
              <button
                type="button"
                className="btn btn-outline-secondary px-4 rounded-3"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary px-4 rounded-3 fw-bold"
              >
                <i className="bi bi-check-circle-fill me-2"></i>
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductForm;
