import api from "../Router/api";
import { useFormik } from "formik";
import * as Yup from "yup";

function AddProduct() {
  const formik = useFormik({
    initialValues: {
      name: "",
      imageUrl: "",
      description: "",
      price: "",
      category: "",
      available: true,
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Minimum 3 characters")
        .required("Product name is required"),

      imageUrl: Yup.string().required("Image URL is required"),

      description: Yup.string()
        .min(10, "Minimum 10 characters")
        .required("Description is required"),

      price: Yup.number()
        .positive("Price must be greater than 0")
        .required("Price is required"),

      category: Yup.string().required("Please select category"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await api.post("/ecom/products/add", values);

        console.log(response.data);

        alert("✅ Product Added Successfully");

        resetForm();
      } catch (error) {
        console.error(error);

        alert(error.response?.data?.message || "Failed to add product");
      }
    },
  });

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-9">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            {/* Header */}
            <div
              className="text-white p-4"
              style={{
                background: "linear-gradient(to right, #082b4d, #0d4d85)",
              }}
            >
              <h2 className="fw-bold mb-1">
                <i className="bi bi-plus-circle-fill me-2"></i>
                Add New Product
              </h2>

              <p className="mb-0 opacity-75">
                Add products to your ecommerce store
              </p>
            </div>

            {/* Form */}
            <div className="card-body p-5">
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  {/* Product Name */}
                  <div className="col-md-6 mb-4">
                    <label className="fw-bold mb-2">Product Name</label>

                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-box-seam"></i>
                      </span>

                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.name && formik.errors.name
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Enter product name"
                        {...formik.getFieldProps("name")}
                      />
                    </div>

                    <div className="text-danger small">
                      {formik.touched.name && formik.errors.name}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-md-6 mb-4">
                    <label className="fw-bold mb-2">Price</label>

                    <div className="input-group">
                      <span className="input-group-text">₹</span>

                      <input
                        type="number"
                        className={`form-control ${
                          formik.touched.price && formik.errors.price
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Enter price"
                        {...formik.getFieldProps("price")}
                      />
                    </div>

                    <div className="text-danger small">
                      {formik.touched.price && formik.errors.price}
                    </div>
                  </div>

                  {/* Image URL */}
                  <div className="col-12 mb-4">
                    <label className="fw-bold mb-2">Product Image URL</label>

                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-image-fill"></i>
                      </span>

                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.imageUrl && formik.errors.imageUrl
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Paste image URL"
                        {...formik.getFieldProps("imageUrl")}
                      />
                    </div>

                    <div className="text-danger small">
                      {formik.touched.imageUrl && formik.errors.imageUrl}
                    </div>
                  </div>

                  {/* Category */}
                  <div className="col-md-6 mb-4">
                    <label className="fw-bold mb-2">Category</label>

                    <select
                      className={`form-select ${
                        formik.touched.category && formik.errors.category
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("category")}
                    >
                      <option value="">Select Category</option>

                      <option value="fruits">Fruits</option>

                      <option value="vegetables">Vegetables</option>

                      <option value="electronics">Electronics</option>

                      <option value="gadgets">Gadgets</option>
                    </select>

                    <div className="text-danger small">
                      {formik.touched.category && formik.errors.category}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="col-12 mb-4">
                    <label className="fw-bold mb-2">Description</label>

                    <textarea
                      rows="5"
                      className={`form-control ${
                        formik.touched.description && formik.errors.description
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter product description..."
                      {...formik.getFieldProps("description")}
                    ></textarea>

                    <div className="text-danger small">
                      {formik.touched.description && formik.errors.description}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center mt-3">
                  <button
                    type="submit"
                    className="btn btn-success px-5 py-3 fw-bold rounded-3 shadow"
                  >
                    <i className="bi bi-plus-circle-fill me-2"></i>
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
