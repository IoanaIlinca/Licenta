import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {deleteProduct, getProducts, deployProductCall} from "../../redux/apiCalls";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const deployed = useSelector((state) => state.blockchain.deployed);
  let dep = [];

  useEffect( () => {
      getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  const handleDeploy = (isDeployed, id, name, price, VAT) => {

      if (isDeployed) {
          alert("Product already deployed!");
      }
      else {
          deployProductCall(id, name, price, VAT, dispatch);
      }

  }

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
            <div className="productListItem">
              <img className="productListImg" src={params.row.image} alt="" />
              {params.row.title}
            </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
            <>
              <Link to={"/product/" + params.row._id}>
                <button className="productListEdit">Edit</button>
              </Link>
                <button onClick={ () =>
                { handleDeploy(deployed[deployed.findIndex((item) => item.id === params.row._id)].value,
                        params.row._id, params.row.title, params.row.price, 24)}}
                    className={deployed[deployed.findIndex((item) => item.id === params.row._id)].value === false ? "productListDeploy" : "productListDeployDisabled"}>
                    {deployed[deployed.findIndex((item) => item.id === params.row._id)].value === false ? "Deploy" : "Deployed"}</button>
              <DeleteOutline
                  className="productListDelete"
                  onClick={() => handleDelete(params.row._id)}
              />

            </>
        );
      },
    },
  ];

  return (
      <div className="productList">
          <div  className="productCreateContainer">
              <Link to="/newproduct">
                  <button className="productAddButton">Create</button>
              </Link>
          </div>

        <DataGrid
            rows={products}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={8}
            checkboxSelection
        />
      </div>
  );
}