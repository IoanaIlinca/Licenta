import "./orderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deployBillCall, deployProductCall, getOrders, updateOrder, updateOrderStatus} from "../../redux/apiCalls";
import {billAdded} from "../../web3/web3Init";

export default function OrderList() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.orders);
    const deployedOrders = useSelector((state) => state.blockchain.deployedOrders);

    useEffect(() => {
        getOrders(dispatch);
    }, [dispatch]);

    const handleDeploy = async (id, total) => {
        if (deployedOrders.find((item) => item.id === id).value) {
             alert("Order already deployed!");
         }
         else {
            deployBillCall(id, total).then((res) => {
                updateOrder(dispatch, {_id: id, status: "processing"});
            });


        }


    }

    const handleResetting = async (id) => {
        if (deployedOrders.find((item) => item.id === id).value) {
            alert("Order already deployed, cannot be reset");
            return;
        }
        updateOrder(dispatch, {_id: id,  status: "pending"});
    }

    const handleDecline = async (id) => {
        updateOrder(dispatch, {_id: id, status: "declined"});
    }

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "userId",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
            <div className="userListUser">
              {params.row.userId}
            </div>
        );
      },
    },
    { field: "amount", headerName: "Amount", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },/*
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },*/
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
          return (
              <>
                  {params.row.status === "pending" ? (
                      <>
                          <button onClick={() => {handleDeploy(params.row._id, params.row.amount)}} className="orderListAccept">Process</button>
                          <button className="orderListDecline" onClick={() => {handleDecline(params.row._id)}}>Decline</button>
                      </>

                      ) :
                      deployedOrders.find((order) => order.id === params.row._id).value === false && (
                      <button onClick={() => {handleResetting(params.row._id)}} className="orderListAccept">Reset</button>
                          )

                  }

                  <Link to={"/order/" + params.row._id}>

                       <button className="orderListView">View</button>
                  </Link>

              </>
          );
      },
    },
  ];

  return (
      <div className="userList">
        <DataGrid
            rows={orders}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={8}
            checkboxSelection
        />
      </div>
  );
}