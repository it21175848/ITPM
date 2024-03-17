import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteShop, getShops } from "../../redux/apiCalls";

export default function ShopList() {
  const shops = useSelector((state) => state.shop.shops);
  const dispatch = useDispatch();
  

  useEffect(() => {
    getShops(dispatch);
    console.log("Shops:", shops);
  }, [dispatch, shops]);
  
  const handleDelete = (id) => {
    deleteShop(dispatch, id);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "shop",
      headerName: "Shop",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "location", headerName: "Location", width: 200 },

    {
      field: "contact",
      headerName: "Contact",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/shop/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
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
      <DataGrid
        rows={shops}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        getRowId={(row) => row._id}
        checkboxSelection
      />
    </div>
  );
}
