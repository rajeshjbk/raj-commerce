import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const AdminLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Ecommerce | Admin Login";

    return () => {
      document.title = "Ecommerce App";
    };
  }, []);

  // Validation Schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .email("Enter valid email")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be minimum 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema,

    onSubmit: async (values) => {
      try {
        const authHeader = `Basic ${btoa(
          `${values.username}:${values.password}`,
        )}`;

        const response = await axios.get(
          "https://ecommerce-backend-mhno.onrender.com/ecom/signIn",
          {
            headers: {
              Authorization: authHeader,
            },
          },
        );

        console.log(response.data);

        const role =
          response.data.userRole ||
          response.data.role ||
          response.data.user_role ||
          response.data.authorities?.[0]?.authority;

        if (role !== "ROLE_ADMIN") {
          alert("Only Admin can login");
          return;
        }

        // Remove User Storage
        localStorage.removeItem("userid");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("cartid");
        localStorage.removeItem("name");
        localStorage.removeItem("orderid");

        // Save Admin Data
        localStorage.setItem(
          "adminJwtToken",
          response.headers.authorization?.replace("Bearer ", ""),
        );

        localStorage.setItem("adminid", response.data.id);

        localStorage.setItem("adminRole", role);

        alert("Admin Login Successfully");

        navigate("/admin/admin");
      } catch (error) {
        console.error(error);

        if (error.response?.status === 401) {
          alert("Invalid Email or Password");
        } else {
          alert("Something went wrong");
        }
      }
    },
  });

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex justify-content-center align-items-center">
      <div className="col-lg-4 col-md-6 col-sm-10">
        <div className="card shadow-lg border-0 rounded-4 p-4">
          {/* Header */}
          <div className="text-center mb-4">
            <i className="bi bi-person-lock display-3 text-primary"></i>

            <h2 className="fw-bold mt-2">Admin Login</h2>

            <p className="text-muted">Login to Admin Panel</p>
          </div>

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
                  name="username"
                  className={`form-control ${
                    formik.touched.username && formik.errors.username
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Enter Email"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="username"
                />
              </div>

              {formik.touched.username && formik.errors.username && (
                <div className="text-danger small mt-1">
                  {formik.errors.username}
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
                  placeholder="Enter Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="current-password"
                />
              </div>

              {formik.touched.password && formik.errors.password && (
                <div className="text-danger small mt-1">
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-bold rounded-3"
            >
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
