import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import "./shopList.css"; 
import { userRequest } from "./requestMethods"; 
import { Link } from 'react-router-dom'; 
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function ParkingList() {
  const [parkings, setParkings] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    getParkings();
  }, []);

  const getParkings = async () => {
    try {
      const response = await userRequest.get('/parking');
      setParkings(response.data);
    } catch (error) {
      console.error('Error fetching parkings:', error);
    }
  };
  
  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };
  
  const confirmDelete = async () => {
    try {
      await userRequest.delete(`/parking/${deleteId}`);
      getParkings();
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error deleting parking:', error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Vehicle Number', 'Vehicle Type', 'Duration', 'Slot']], // Updated header for parking details
      body: parkings.map(parking => ([parking.vehicleNumber, parking.vehicleType, parking.duration, parking.seat])), // Updated body for parking details
    });
    doc.save("parking_list.pdf");
  };
  

  const columns = [
    { field: '_id', headerName: 'ID', width: 150 },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', width: 200 },
    { field: 'vehicleType', headerName: 'Vehicle Type', width: 150 },
    { field: 'duration', headerName: 'Duration', width: 150 },
    { field: 'seat', headerName: 'Seat', width: 150 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
          <Link to={`/edit-parking/${params.row._id}`}> {/* Link to the edit page */}
              <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>Edit</Button> {/* Button to navigate to the edit page */}
            </Link>
            <DeleteOutline className="parkingListDelete" onClick={() => handleDelete(params.row._id)} />
          </>
        );
      },
    },
  ];

  return (
    <div className="shopList">
    <div style={{ height: 400, width: '100%' }}>
      <h2 style={{color: 'blue', fontSize: '30px'}}>Parking Slots List</h2>
      <br/>
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
        <br/>
      <h3 style={{fontSize: '20px', color: 'green'}}>
           Welcome to our Parking management dashboard. Here you can view, edit and manage Parking details.
      </h3>
      <DataGrid
        rows={parkings}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(row) => row._id}
      />

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onClose={cancelDelete} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure you want to delete this parking slot?</DialogContentText>
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
    </div>
  );
}
