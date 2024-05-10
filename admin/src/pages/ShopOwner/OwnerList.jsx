
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOwner, getOwners, getShops } from "../../redux/apiCalls";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './ownerList.css'

export default function OwnerList() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const owners = useSelector((state) => state.owner.owners);
  const shops = useSelector((state) => state.shop.shops);
  const dispatch = useDispatch();

  useEffect(() => {
    getOwners(dispatch);
    getShops(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    deleteOwner(dispatch, deleteId);
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['ID', 'Shop Name', 'Owner Name', 'Email', 'NIC']],
      body: owners.map(owner => {
        const shop = shops.find(shop => shop.ownerId === owner._id);
        return [owner._id, shop ? shop.name : '', owner.name, owner.email, owner.nic];
      }),
    });
    doc.save("owners_list.pdf");
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "shopName",
      headerName: "Shop Name",
      width: 200,
      valueGetter: (params) => {
        const shop = shops.find(shop => shop.ownerId === params.row._id);
        return shop ? shop.name : '';
      },
    },
    {
      field: "name",
      headerName: "Owner Name",
      width: 200,
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "nic", headerName: "NIC", width: 160 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/owner/" + params.row._id}>
              <button className="ownerListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="ownerListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

return (
    <div className="ownerList">
      <div className="productListHeader">
        <h2>Owner List</h2>
        <div className="productListHeaderRight">
          <Link to="/createowner">
            <Button
              variant="contained"
              color="primary"
              className="productButton"
              style={{ padding: "8px 70px" ,margin: "0 20px"}}
            >
              ADD OWNER
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
      <h3 style={{fontSize: '20px', color: 'green'}}>
        Welcome to our Owner management dashboard. Here you can view, edit and manage shop Owners details.
      </h3>
      <br />
      <DataGrid
        rows={owners}
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
            Are you sure you want to delete this owner?
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
