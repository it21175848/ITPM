import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { userRequest } from './requestMethods';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';
import './updateShop.css';

export default function EditParking() {
  const { id } = useParams();
  const history = useHistory();
  const [parking, setParking] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchParking();
  }, []);

  const fetchParking = async () => {
    try {
      const response = await userRequest.get(`/parking/${id}`);
      setParking(response.data);
    } catch (error) {
      console.error('Error fetching parking:', error);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await userRequest.delete(`/parking/${deleteId}`);
      setShowConfirmation(false);
      history.push('/parkings');
    } catch (error) {
      console.error('Error deleting parking:', error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParking((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userRequest.put(`/parking/${id}`, parking);
      history.push('/parkings');
    } catch (error) {
      console.error('Error updating parking:', error);
    }
  };

  return (
    <div className="updateShop">
      <div className="updateShopTitleContainer">
        <h1 className="updateShopTitle">Parking Slot</h1>
        <Link to="/parkinglist">
          <button className="updateShopAddButton">Go Back</button>
        </Link>
      </div>
      <div className="updateShopBottom">
        <form className="updateShopForm" onSubmit={handleSubmit}>
          <div className="updateShopFormLeft">
            <label htmlFor="vehicleNumber">Vehicle Number</label>
            <input type="text" id="vehicleNumber" name="vehicleNumber" placeholder="Vehicle Number" onChange={handleChange} value={parking.vehicleNumber || ""}/>
            <label htmlFor="vehicleType">Vehicle Type</label>
            <input type="text" id="vehicleType" name="vehicleType" placeholder="Vehicle Type" onChange={handleChange} value={parking.vehicleType || ""}/>
            <label htmlFor="duration">Duration</label>
            <input type="text" id="duration" name="duration" placeholder="Duration" onChange={handleChange} value={parking.duration || ""}/>
            <label htmlFor="seat">Seat</label>
            <input type="text" id="seat" name="seat" placeholder="Slot" onChange={handleChange} value={parking.seat || ""}/>
          </div>
          <button className="updateShopButton" type="submit">Update</button>
        </form>
      </div>
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
            Are you sure you want to delete this parking slot?
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
