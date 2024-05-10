import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios'; // Import axios for making HTTP requests
import './ownerList.css';

export default function CustomerSupportList() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [customerSupports, setCustomerSupports] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/customerSupport/");
      setCustomerSupports(response.data);
    } catch (error) {
      console.error("Error fetching customer support data:", error);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/customerSupport/${deleteId}`);
      setCustomerSupports(customerSupports.filter((item) => item._id !== deleteId));
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error deleting customer support ticket:", error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['ID', 'Name', 'Email', 'Subject', 'Message', 'Phone Number']],
      body: customerSupports.map(customerSupport => ([customerSupport._id, customerSupport.name, customerSupport.email, customerSupport.subject, customerSupport.message, customerSupport.phoneNo])),
    });
    doc.save("customer_support_list.pdf");
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "subject", headerName: "Subject", width: 200 },
    { field: "message", headerName: "Message", width: 200 },
    { field: "phoneNo", headerName: "Phone Number", width: 160 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/customerSupportList/${params.row._id}`}>
              <button className="ownerListEdit">View</button>
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
        <h2>Customer Support List</h2>
        <div className="productListHeaderRight">
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
        rows={customerSupports}
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
            Are you sure you want to delete this customer support ticket?
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
