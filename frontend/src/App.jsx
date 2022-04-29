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
import Success from "./pages/Succes";
import {useSelector} from "react-redux";

const App = () => {
    const user = useSelector((state) => state.user.currentUser);
  return (
      <div>
          <Router>
        <Announcement/>
        <Navbar/>

              <Routes>
                  <Route exact path='/' element={<Home/>} />
                  <Route exact path='/products/:category' element={<ProductList/>} />
                  <Route exact path='/products' element={<ProductList/>} />
                  <Route exact path='/product/:id' element={<Product/>} />
                  <Route exact path='/cart' element={<Cart/>} />
                  <Route exact path='/success' element={<Success/>} />
                  <Route exact path='/register' element={user ? <Navigate replace to="/" /> : <Register/>} />
                  <Route exact path='/login' element={user ? <Navigate replace to="/" /> : <Login/>} />
              </Routes>


        <Footer/>
          </Router>
      </div>
  );
};

export default App;