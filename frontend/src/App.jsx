import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Announcement from "./components/Announcement";
import Navbar from "./components/Navbar";
import React from "react";
import Footer from "./components/Footer";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

const App = () => {
  return (
      <div>
        <Announcement></Announcement>
        <Navbar></Navbar>
        <Login></Login>
        <Footer></Footer>
      </div>
  );
};

export default App;