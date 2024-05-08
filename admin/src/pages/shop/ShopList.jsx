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
  const [showConfirmation, setShowConfirmation] = useState(false); 
  const [deleteId, setDeleteId] = useState(null); 

  useEffect(() => {
    getShops(dispatch);
  }, [dispatch]);

  useEffect(() => {
    console.log("Shops:", shops);
  }, [shops]); // Log shops whenever shops state changes

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    deleteShop(dispatch, deleteId);
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Shop ID', 'Shop Name', 'Location', 'Owner Name', 'Phone', 'Category', 'Floor Level', 'Shop Number']],
      body: shops.map(shop => ([shop._id, shop.name, shop.location, shop.ownerName, shop.phone, shop.category, shop.floorLevel, shop.shopNumber])),
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
    { field: "ownerId", headerName: "OwnerID", width: 130 },
    { field: "shopPhoneNumber", headerName: "Shop Phone", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "floorLevel", headerName: "Floor", width: 150 },
    { field: "shopNumber", headerName: "ShopNo", width: 140 },
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
      <h3 style={{fontSize: '20px', color: 'green'}}>
           Welcome to our Shop management dashboard. Here you can view, edit and manage Shop details.
      </h3>
      <br/>
      <DataGrid
        rows={shops}
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
