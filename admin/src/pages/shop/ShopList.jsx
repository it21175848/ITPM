import "./shopList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteShop, getShops } from "../../redux/apiCalls";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function ShopList() {
  const shops = useSelector((state) => state.shop.shops);
  const dispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false); // State variable for showing confirmation popup
  const [deleteId, setDeleteId] = useState(null); // State variable to store the ID of the shop to be deleted

  useEffect(() => {
    getShops(dispatch);
    console.log("Shops:", shops);
  }, [dispatch, shops]);
  
  const handleDelete = (id) => {
    setDeleteId(id); // Set the ID of the shop to be deleted
    setShowConfirmation(true); // Show confirmation popup
  };

  const confirmDelete = () => {
    deleteShop(dispatch, deleteId); // Delete the shop
    setShowConfirmation(false); // Hide confirmation popup
  };

  const cancelDelete = () => {
    setShowConfirmation(false); // Hide confirmation popup
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Shop ID', 'Shop Name', 'Location', 'Owner Name', 'Phone', 'Category']],
      body: shops.map(shop => ([shop._id, shop.name, shop.location, shop.ownerName, shop.phone, shop.category])),
    });
    doc.save("shops_list.pdf");
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "shop",
      headerName: "Shop",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="shopListItem">
            <img className="shopListImg" src={params.row.image} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "location", headerName: "Location", width: 200 },
    { field: "ownerName", headerName: "Shop Owner", width: 200 },
    { field: "phone", headerName: "Owner Contact", width: 160 },
    { field: "category", headerName: "Category", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/shop/" + params.row._id}>
              <button className="shopListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="shopListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        ); 
      },
    },
  ];

  return (
    <div className="shopList">
      <div className="productListHeader">
        <h2>Shops List</h2>
        <div className="productListHeaderRight">
          <Link to="/createshop">
            <Button 
              variant="contained" 
              color="primary" 
              className="productButton" 
              style={{  padding: "8px 70px", margin: "0 20px" }}
            >
              ADD SHOP
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
      <br/>
      <DataGrid
        rows={shops}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        getRowId={(row) => row._id}
        checkboxSelection
      />

      {/* Confirmation Dialog */}
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
