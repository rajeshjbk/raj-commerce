import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import loginbg from "../picture/loginbg1.webp";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Ecommerce | Login";

    return () => {
      document.title = "Ecommerce App";
    };
  }, []);

  // Validation
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

        const token = response.headers.authorization;

        if (token) {
          localStorage.setItem(
            "jwtToken",
            response.headers.authorization?.replace("Bearer ", ""),
          );

          localStorage.setItem("userid", response.data.id);

          localStorage.setItem("name", response.data.firstName);

          localStorage.setItem("userRole", response.data.userRole);

          alert("Login Successfully");

          navigate("/");
        }
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
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${loginbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="row w-100 justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-10">
          <div
            className="card border-0 shadow-lg rounded-4 p-4"
            style={{
              backdropFilter: "blur(8px)",
              background: "rgba(255,255,255,0.9)",
            }}
          >
            {/* Header */}
            <div className="text-center mb-4">
              <i className="bi bi-person-circle text-primary display-2"></i>

              <h2 className="fw-bold mt-2">User Login</h2>

              <p className="text-muted">Welcome Back</p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              {/* Email */}
              <div className="mb-3">
                <label className="fw-semibold mb-2">Email</label>

                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-envelope-fill"></i>
                  </span>

                  <input
                    type="email"
                    name="username"
                    placeholder="Enter Email"
                    className={`form-control ${
                      formik.touched.username && formik.errors.username
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete="username"
                  />
                </div>

                {formik.touched.username && formik.errors.username && (
                  <small className="text-danger">
                    {formik.errors.username}
                  </small>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="fw-semibold mb-2">Password</label>

                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock-fill"></i>
                  </span>

                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    className={`form-control ${
                      formik.touched.password && formik.errors.password
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete="current-password"
                  />
                </div>

                {formik.touched.password && formik.errors.password && (
                  <small className="text-danger">
                    {formik.errors.password}
                  </small>
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

              {/* Register */}
              <div className="text-center mt-4">
                <span className="text-muted">Don't have an account?</span>

                <Link
                  to="/register-user"
                  className="text-decoration-none fw-bold ms-2"
                >
                  Register Here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
