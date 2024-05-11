import "./productList.css";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStock, setSelectedStock] = useState("");
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    getProducts(dispatch);
    console.log("products:", products);
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleStockChange = (event) => {
    setSelectedStock(event.target.value);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    deleteProduct(dispatch, deleteId);
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Product ID", "Product Name", "Stock", "Price"]],
      body: products.map((product) => [
        product._id,
        product.title,
        product.inStock,
        product.price,
      ]),
    });
    doc.save("product_list.pdf");
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
        <h2>Product List</h2>
        <div className="productListHeaderRight">
          <Link to="/NewProduct">
            <Button
              variant="contained"
              color="primary"
              className="productButton"
              style={{ padding: "8px 70px" }}
            >
              Create
            </Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            style={{
              padding: "8px 40px",
              margin: "0 10px",
              backgroundColor: "green",
            }}
            onClick={downloadAsPDF}
          >
            Download As PDF
          </Button>
        </div>
      </div>
      <br />
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        getRowId={(row) => row._id}
        checkboxSelection
      />
      <Dialog
        open={showConfirmation}
        onClose={cancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this shop?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
