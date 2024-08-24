import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import React from "react";
import Pagenotfound from "./pages/Pagenotfound";
import Policy from "./pages/Policy";
import { Routes, Route } from "react-router-dom";
import Category from "./pages/Category";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/user/Dashboard";
import Private from "./component/Routes/Private";
import Admin from "./pages/admin/Admin";
import AdminRoute from "./component/Routes/AdminRoute";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/product/:slug" element={<ProductDetails/>} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/category" element={<Category />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/dashboard" element={<Private />}>
          <Route path="user" element={<Dashboard/>} />
        </Route> */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<Admin />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
