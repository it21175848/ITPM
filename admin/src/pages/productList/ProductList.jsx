import "./productList.css";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import { Button, TextField, MenuItem, Select, InputLabel } from "@material-ui/core";



export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStock, setSelectedStock] = useState("");
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  
  useEffect(() => {
    getProducts(dispatch);
    console.log("products:", products);
  }, [dispatch]);
  
  const handleDelete = (id) => {
    deleteProduct(dispatch, id);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleStockChange = (event) => {
    setSelectedStock(event.target.value);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
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
    { field: "inStock", headerName: "Stock", width: 200 },

    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
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
      <div className="productListHeader">
        <h2 style={{color: 'blue', fontSize: '30px'}}>Product List</h2>
        <div className="productListHeaderRight">
          <Link to="/NewProduct">
            <Button 
              variant="contained" 
              color="primary" 
              className="productButton" 
              style={{  padding: "8px 70px" }}
            >
              Create
            </Button>
          </Link>
        </div>
      </div>
      <br/>
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        getRowId={(row) => row._id}
        checkboxSelection
      />
    </div>
  );
}
