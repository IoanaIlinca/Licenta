import { Link, useLocation } from "react-router-dom";
import "./order.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import {addProduct, deployBillCall, deployEntryCall, updateProduct} from "../../redux/apiCalls";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import app from "../../firebase";

export default function Order() {
    const location = useLocation();
    const orderId = location.pathname.split("/")[2];
    const dispatch = useDispatch();

    const order = useSelector((state) =>
        state.order.orders.find((order) => order._id === orderId)
    );

    const user = useSelector((state) =>
        state.user.users.find((user) => user._id === order.userId)
    );

    const products = useSelector((state) =>
        state.product.products
    );

    const handleAdd = (e, productId, productQuantity) => {
        e.preventDefault();
        deployEntryCall(orderId, productId, productQuantity);
    }


    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Order</h1>
               {/* <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>*/}
            </div>
           {/* <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product.image} alt="" className="productInfoImg" />
                        <span className="productName">{product.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{product._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">sales:</span>
                            <span className="productInfoValue">5123</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">in stock:</span>
                            <span className="productInfoValue">{product.inStock}</span>
                        </div>
                    </div>
                </div>
            </div>*/}
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>{orderId}</label>
                        {order.products.map( entry => (
                            <div key={entry.productId}>
                                <img src={products[products.findIndex((item) => item._id === entry.productId)].image} className="productUploadImg">
                                </img>
                                <div>{products[products.findIndex((item) => item._id === entry.productId)].title} </div>
                                <div>{entry.quantity} x {products[products.findIndex((item) => item._id === entry.productId)].price}</div>
                                {/*Get price from blockchain*/}
                                {/*<div>{products[products.findIndex((item) => item._id === entry.productId)].color}: {products[products.findIndex((item) => item._id === entry.productId)].price}</div>*/}
                                {/*maybe add color and quantity*/}
                                <button className="productAddButton" onClick={(e) => {handleAdd(e, entry.productId, entry.quantity)}}>Deploy entry</button>
                            </div>

                        ))}
                       {/* <div>Prod 1</div>
                        <div>Prod 2</div>
                        <div>Prod 3</div>*/}
                    </div>
                    <div className="productFormRight">
                        <div>User: {user.username}</div>
                        <div>Name: {user.firstName +  " " + user.lastName}</div>
                        <div>Amount: {order.amount}</div>
                        <div>Address: {order.address}</div>
                        <div>Status: {order.status}</div>
                    </div>
                </form>
            </div>
        </div>
    );
}