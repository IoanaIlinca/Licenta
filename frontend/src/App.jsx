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
import {
    BrowserRouter as Router,
    Routes,
    Route, Navigate,
} from "react-router-dom";

const App = () => {
    const user = false;
  return (
      <div>
        <Announcement/>
        <Navbar/>
          <Router>
              <Routes>
                  <Route exact path='/' element={<Home/>} />
                  <Route exact path='/products/:category' element={<ProductList/>} />
                  <Route exact path='/products' element={<ProductList/>} />
                  <Route exact path='/product/:id' element={<Product/>} />
                  <Route exact path='/cart' element={<Cart/>} />
                  <Route exact path='/register' element={user ? <Navigate replace to="/" /> : <Register/>} />
                  <Route exact path='/login' element={user ? <Navigate replace to="/" /> : <Login/>} />
              </Routes>
          </Router>

        <Footer/>
      </div>
  );
};

export default App;