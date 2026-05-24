
import { Routes, Route } from "react-router-dom";
import Login from "../pages/LogIn.jsx";
import Registration from "../pages/Registration.jsx";
import Home from "../pages/Home.jsx";
import Products from "../pages/Product.jsx";
import AdminLogin from "../pages/AdminLogIn.jsx";
import Admin from "../pages/Admin.jsx";
import Profile from "../components/Profile.jsx";
import Cart from "../pages/Cart.jsx";
import OrderDetails from "../pages/OrderDetails.jsx";

import ShippingDetails from "../pages/ShippingDetails.jsx";
import Payment from "../pages/Payment.jsx";
import PaymentForm from "../pages/PaymentForm.jsx";
import SingleProduct from "../pages/SingleProduct.jsx";
import NotFound from "../components/NotFound.jsx";
import { Privateroute, PrivaterouteAdmin } from "./ProtectedRoute.jsx";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/user" element={<Privateroute />}>
          <Route path="cart" element={<Cart />} />
          <Route path="save-address" element={<ShippingDetails />} />
          <Route path="order-details" element={<OrderDetails />} />
          <Route path="payment-success" element={<Payment />} />
          <Route path="make-payment" element={<PaymentForm />} />
          <Route path="profile/:userId" element={<Profile />} />
        </Route>

        <Route path="/admin" element={<PrivaterouteAdmin />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/register-user" element={<Registration />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default AllRoutes;
