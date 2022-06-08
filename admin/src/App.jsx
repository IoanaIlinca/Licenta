import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import {useDispatch, useSelector} from "react-redux";
import Web3 from "web3";
import {useEffect, useState} from "react";
import { Init} from "./web3/web3Init";
import OrderList from "./pages/orderList/OrderList";
import {Button} from "@material-ui/core";
import {getOrders, getProducts, getUsers, setInitTrue} from "./redux/apiCalls";
import Order from "./pages/order/Order";

function App() {
    const initialised = useSelector((state) => state.blockchain.initialised);
    const dispatch = useDispatch();
    const admin = useSelector((state) => state.user.currentUser ?  state.user.currentUser.isAdmin : false);

    const setInit = async () => {
        getProducts(dispatch);
        getUsers(dispatch);
        getOrders(dispatch);
        if (initialised === false) {
            await Init();
            setInitTrue(dispatch);
        }

    }
    useEffect(() => {
        setInit();
    }, []);





  return (
    <Router>
      <Switch>

        <Route path="/login">
              <Login />
          </Route>
        {admin && (
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/users">
                  <UserList />
                </Route>
                <Route path="/user/:userId">
                  <User />
                </Route>
                <Route path="/products">
                  <ProductList />
                </Route>
                <Route path="/product/:productId">
                  <Product />
                </Route>
                <Route path="/newproduct">
                  <NewProduct />
                </Route>
                  <Route path="/orders">
                  <OrderList />
                </Route>
                  <Route path="/order/:id">
                  <Order />
                </Route>
              </div>
            </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
