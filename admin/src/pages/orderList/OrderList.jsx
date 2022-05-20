import "./orderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deployBillCall, deployProductCall, getOrders} from "../../redux/apiCalls";

export default function OrderList() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.orders);

    useEffect(() => {
        getOrders(dispatch);
    }, [dispatch]);

    const handleDeploy = (id, total) => {
       /* if (isDeployed) {
            alert("Product already deployed!");
        }
        else {
            deployProductCall(id, name, price, VAT, dispatch);
        }*/
        deployBillCall(id, total);
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
                  {params.row.status === "pending" && (
                      <>
                          <button onClick={() => {handleDeploy(params.row._id, params.row.amount)}} className="orderListAccept">Accept</button>
                          <button className="orderListDecline">Decline</button>
                      </>

                      )}

                  <button className="orderListView">View</button>
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