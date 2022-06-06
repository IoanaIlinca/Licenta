import { Link, useLocation } from "react-router-dom";
import "./order.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import {addProduct, deployBillCall, deployEntryCall, getEntries, getOrders, updateProduct} from "../../redux/apiCalls";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import app from "../../firebase";
import {entryDeployed} from "../../web3/web3Init";

export default function Order() {
    const location = useLocation();
    const orderId = location.pathname.split("/")[2];
    const [deployedEntries, setDeployedEntries] = useState({});
    const dispatch = useDispatch();

    const entries = useSelector((state) =>
        state.blockchain.entries
    );

    const order = useSelector((state) =>
        state.order.orders.find((order) => order._id === orderId)
    );

    const deployedProducts = useSelector((state) =>
        state.blockchain.deployed
    );



    const user = useSelector((state) =>
        state.user.users.find((user) => user._id === order.userId)
    );

    const products = useSelector((state) =>
        state.product.products
    );

    const handleAdd = (e, productId, productQuantity) => {
        e.preventDefault();
        deployEntryCall(dispatch, orderId, productId, productQuantity);

    }

    useEffect(() => {
        const getDeployedEntries = async () => {
            try {
                let deployedEntriesNo = 0;
                const currentEntries = entries.filter(entry => {
                    return entry.orderId = orderId;
                });
                for (let entry of currentEntries) {
                    if (entry.value === true)
                        deployedEntriesNo++;
                }
                //if (deployedEntriesNo !== order.products.length) {

                getEntries(orderId, deployedEntriesNo).then((deployedEntries) => {
                    console.log("those are the entries");
                    console.log(deployedEntries);
                    setDeployedEntries(deployedEntries);
                });
               // }

            } catch (err) {
                console.log(err);
            }
        };
        getDeployedEntries();
    }, [orderId, entries]);


    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Order</h1>
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
                        <span className="entryContainer">
                            {order.products.map( entry => (

                                <div key={entry.productId} className="productContainer">
                                    <img src={products[products.findIndex((item) => item._id === entry.productId)].image} className="productUploadImg">
                                    </img>
                                    <div>{products[products.findIndex((item) => item._id === entry.productId)].title} </div>
                                    <div>{entry.quantity} x {products[products.findIndex((item) => item._id === entry.productId)].price}</div>
                                   {/* Get price from blockchain
                                    <div>{products[products.findIndex((item) => item._id === entry.productId)].color}: {products[products.findIndex((item) => item._id === entry.productId)].price}</div>
                                    maybe add color and quantity*/}
                                    { order.status === 'processing' && entries.find((item) => item.orderId === orderId && item.productId === entry.productId).value === false &&
                                    (
                                        <>
                                            {deployedProducts.find((item) => item.id === entry.productId).value ?
                                                <button className="productAddButton" onClick={(e) => {handleAdd(e, entry.productId, entry.quantity)}}>Deploy entry</button>
                                                : <button className="productNotDeployedButton">Product not deployed</button>
                                            }

                                        </>
                                    )
                                    }
                                </div>

                            ))}
                        </span>


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