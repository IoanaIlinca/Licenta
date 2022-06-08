import { Link, useLocation } from "react-router-dom";
import "./order.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import {Clear, Publish} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import {
    addProduct,
    deployBillCall,
    deployEntryCall,
    getEntries,
    getOrders, getProdInOrder, getUser,
    updateOrder,
    updateProduct
} from "../../redux/apiCalls";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import app from "../../firebase";
import {entryDeployed, getBillByOrder, getProductForEntry} from "../../web3/web3Init";
import {setDeployed} from "../../redux/blockchainRedux";
import {DataGrid} from "@material-ui/data-grid";

export default function Order() {
    const location = useLocation();
    const orderId = location.pathname.split("/")[2];
    const [deployedEntries, setDeployedEntries] = useState([]);
    const [entries, setEntries] = useState([]);
    const [bill, setBill] = useState([]);
    const [billActive, setBillActive] = useState(false);
    const dispatch = useDispatch();
    const [init, setInit] = useState(false);

    const products = useSelector((state) =>
        state.product.products
    );

    const order = useSelector((state) =>
        state.order.orders.find((order) => order._id === orderId)
    );




    const deployedProducts = useSelector((state) =>
        state.blockchain.deployed
    );

    const [user, setUser] = useState(null);



    const handleAdd = (e, productId, productQuantity) => {
        e.preventDefault();
        deployEntryCall(dispatch, orderId, productId, productQuantity);

    }



    useEffect(() => {
        const getLocalEntries = async () => {
            let entr = [], depl = [];
            if (order.status === 'processing' || order.status === 'accepted') {
            for (let entry of order.products) {
                if (deployedProducts.findIndex((item) => item.id === entry._id) !== -1) {
                    await entryDeployed(order._id, entry._id, entry.quantity).then(result => {
                        entr.push({orderId: order._id, productId: entry._id, value: result});

                    });
                }

                }
            }
            return entr;
        };
       /* if (!init && order.status === "accepted") {
            getBillByOrder(order._id).then(res => {
                setBill(res);
            });
        }*/
        !init && getLocalEntries().then(async (res) =>  {
            setEntries(res);
            if (order.status === 'processing' || order.status === 'accepted') {
                let deployed = res.filter((item) => item.value === true);
                let final = [];
                for (let item of deployed) {
                    await getProdInOrder(order._id, item.productId).then(res => {
                        final.push(res);
                        console.log("here");
                        console.log(res);
                        setDeployedEntries(final);
                    })
                }
            }
            else {
                setDeployedEntries([]);
            }

            await (entries.length !== 0);
            setInit(true);
        });

        /**/
        /*setDeployedEntries(depl);
        setEntries(entr);*/
    }, [order, entries, deployedEntries, bill]);

    const handleAccept = async () => {
        updateOrder(dispatch, {_id: orderId, status: "accepted"});
    }

    const getBill = async () => {
       await getBillByOrder(order._id).then(res => {
            setBill(res);
        });
       console.log(bill);
       setBillActive(true)
    }

    const prepareBillEntries = () => {
       return deployedEntries.map((entry, index) => {
           return {
               id: index,
               title: entry[1],
               price: Number(entry[3]) / 100,
               qty: order.products.find((item) => item._id === entry[0]).quantity,
               vat: Number(entry[2]) / 100,
               total: order.products.find((item) => item._id === entry[0]).quantity * Number(entry[3]) / 100
           }
       });
    }



    const columns = [
        { field: 'id', headerName: 'Number', width: 130 },
        { field: 'title', headerName: 'Title', width: 130 },
        {
            field: 'qty',
            headerName: 'Quantity',
            type: 'number',
            width: 50,
        },
        { field: 'price', headerName: 'Price', width: 130 },
        { field: 'vat', headerName: 'VAT', width: 130 },
        {
            field: 'total',
            headerName: 'Total',
            width: 130,
        },
    ]

    console.log(init);
    console.log(entries);
    console.log(deployedEntries);
    /*if (init) {
        console.log(deployedEntries[0]["0"]);
    }*/
    console.log(bill);

    console.log(products);
    return (
        <>
            {init && (
                <>
                    <div className="product">
                        <div className="productTitleContainer">
                            <h1 className="productTitle">Order</h1>
                            {(order.status !== "accepted" && deployedEntries.length === order.products.length) &&
                            (<button className="orderAcceptButton" onClick={() => {handleAccept()}}>Accept order</button>)}
                            {(order.status === "accepted" && deployedEntries.length === order.products.length) && !billActive &&
                            (<button className="orderAcceptButton" onClick={() => {getBill()}}>Get bill</button>)}
                        </div>

                        <div className="productBottom">
                            <form className="productForm">
                                <div className="productFormLeft">

                                    <label>{orderId}</label>
                                    <span className="entryContainer">
                                    {order.products.map( (entry, index) => (
                                        <div key={entry._id} className="productContainer">
                                            {<img src={products[products.findIndex((item) => item._id === entry._id)].image} className="productUploadImg">
                                            </img>}
                                            <div>{products[products.findIndex((item) => item._id === entry._id)].title} </div>
                                            {order.status !== 'accepted' || deployedEntries[index] === undefined ?
                                                <div>{entry.quantity} x { products[products.findIndex((item) => item._id === entry._id)].price}$</div> :
                                                <div>{entry.quantity} x { Number(deployedEntries[index]["3"]) / 100}$</div>
                                            }
                                            {order.products.find((item) => item._id === entry._id).details.map(detail => (
                                                <div key={detail._id}>{detail.color + ", " + detail.size + ": " + detail.quantity + " piece(s)"}</div>
                                            ))}


                                            { order.status === 'processing'  && entries[index].value === false &&
                                            (
                                                <>
                                                    {deployedProducts.find((item) => item.id === entry._id).value === true ?
                                                        <button className="productAddButton" onClick={(e) => {handleAdd(e, entry._id, entry.quantity)}}>Deploy entry</button>
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
                                    <div>User: {order.userId}</div>
                                    {/* <div>Name: {user.firstName +  " " + user.lastName}</div>*/}
                                    <div>Amount: {order.amount}</div>
                                    <div>Address: {order.address}</div>
                                    <div>Status: {order.status}</div>
                                </div>
                            </form>
                        </div>
                    </div>
                    {billActive && (
                        <div className="product">
                            <div className="productTitleContainer">
                                <h1 className="productTitle">Bill</h1>
                                {(order.status === "accepted" && deployedEntries.length === order.products.length) &&
                                (<span className="hideBill" onClick={() => {setBillActive(false)}}> <Clear/></span>)}
                            </div>
                            <div className="productBottom">
                              {/*  <form className="productForm">*/}
                                    <div className="billContainer">

                                        <label className="inBill">Date:  {Date(bill[0])}</label>
                                        <label className="inBill">Total:  {Number(bill[1]) / 100}$</label>
                                        <DataGrid className="gridHeight inBill"
                                                  rows={prepareBillEntries()}
                                                  columns={columns}
                                                  pageSize={5}
                                                  rowsPerPageOptions={[5]}
                                        />
                                    </div>
                                {/*</form>*/}
                            </div>


                        </div>
                    )}

                </>

            )}
        </>


    );
}