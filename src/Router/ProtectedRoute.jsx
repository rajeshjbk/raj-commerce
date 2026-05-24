import { Outlet, Navigate } from "react-router-dom";

const Privateroute = () => {
  let auth = false;
  if (localStorage.getItem("jwtToken") && localStorage.getItem("userid")) {
    auth = true;
  }
  return auth ? <Outlet /> : <Navigate to="/login" />;
  //Normal User Section
};

const PrivaterouteAdmin = () => {
  //Admin User Section

  let auth = false;
  if (
    localStorage.getItem("adminJwtToken") &&
    localStorage.getItem("adminid")
  ) {
    auth = true;
  }
  return auth ? <Outlet /> : <Navigate to="/admin-login" />;
  //Normal User Section
};

export { PrivaterouteAdmin, Privateroute };
