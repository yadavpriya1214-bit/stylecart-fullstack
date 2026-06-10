import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/Orders";
import AdminOrders from "./pages/AdminOrders";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {

 
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
 
  return (
    <Router>

      <Navbar cart={cart} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products setCart={setCart} />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

       
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/category/:category" element={<Category setCart={setCart} />} />

        
        <Route path="/product/:id" element={<ProductDetails setCart={setCart} />}/>
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Routes>
      <Footer/>

    </Router>
  );
}

export default App;