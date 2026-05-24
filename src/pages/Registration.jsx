import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import loginbg from "../picture/loginbg.webp";

const Registration = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter valid email")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),

      firstName: Yup.string()
        .min(2, "Minimum 2 characters")
        .required("First name is required"),

      lastName: Yup.string()
        .min(2, "Minimum 2 characters")
        .required("Last name is required"),

      phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter valid 10 digit phone number")
        .required("Phone number is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          "https://ecommerce-backend-mhno.onrender.com/ecom/customers/addUser",
          values,
        );

        if (response.status === 200) {
          alert("Registration Successful");

          resetForm();

          navigate("/login");
        }
      } catch (error) {
        if (error.response?.data) {
          alert(error.response.data.message);
        } else {
          alert("Registration failed");
        }
      }
    },
  });

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center py-5"
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${loginbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="row justify-content-center w-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5">
          <div className="card border-0 shadow-lg rounded-5 overflow-hidden">
            {/* Header */}
            <div
              className="text-center text-white p-4"
              style={{
                background: "linear-gradient(to right, #082b4d, #0d6efd)",
              }}
            >
              <i className="bi bi-person-plus-fill fs-1 text-warning"></i>

              <h2 className="fw-bold mt-2">Create Account</h2>

              <p className="mb-0 opacity-75">Join Raj-Commerce</p>
            </div>

            {/* Form */}
            <div className="card-body p-4 p-md-5">
              <form onSubmit={formik.handleSubmit}>
                {/* Email */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>

                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-envelope-fill"></i>
                    </span>

                    <input
                      type="email"
                      name="email"
                      className={`form-control ${
                        formik.touched.email && formik.errors.email
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  {formik.touched.email && formik.errors.email && (
                    <div className="text-danger small mt-1">
                      {formik.errors.email}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>

                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-lock-fill"></i>
                    </span>

                    <input
                      type="password"
                      name="password"
                      className={`form-control ${
                        formik.touched.password && formik.errors.password
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  {formik.touched.password && formik.errors.password && (
                    <div className="text-danger small mt-1">
                      {formik.errors.password}
                    </div>
                  )}
                </div>

                {/* First Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">First Name</label>

                  <input
                    type="text"
                    name="firstName"
                    className={`form-control ${
                      formik.touched.firstName && formik.errors.firstName
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.firstName && formik.errors.firstName && (
                    <div className="text-danger small mt-1">
                      {formik.errors.firstName}
                    </div>
                  )}
                </div>

                {/* Last Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Last Name</label>

                  <input
                    type="text"
                    name="lastName"
                    className={`form-control ${
                      formik.touched.lastName && formik.errors.lastName
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.lastName && formik.errors.lastName && (
                    <div className="text-danger small mt-1">
                      {formik.errors.lastName}
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Phone Number</label>

                  <input
                    type="text"
                    name="phoneNumber"
                    className={`form-control ${
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="9876543210"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <div className="text-danger small mt-1">
                      {formik.errors.phoneNumber}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-warning w-100 py-3 fw-bold rounded-4 shadow"
                >
                  <i className="bi bi-person-check-fill me-2"></i>
                  Register
                </button>

                <div className="text-center mt-4">
                  <span className="text-muted">Already have account?</span>

                  <Link
                    to="/login"
                    className="ms-2 fw-bold text-decoration-none"
                  >
                    Login Here
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
