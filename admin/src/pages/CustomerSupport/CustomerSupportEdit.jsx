import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import axios from "axios";
import "./updateOwner.css";

export default function CustomerSupportEdit() {
  const { id } = useParams();
  const history = useHistory();
  const [customerSupportData, setCustomerSupportData] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/customerSupport/${id}`);
        setCustomerSupportData(response.data);
      } catch (error) {
        console.error("Error fetching customer support data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerSupportData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const confirmUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/customerSupport/${id}`, customerSupportData);
      setShowConfirmation(false);
      // Update local state without refreshing
      setCustomerSupportData(prevData => ({ ...prevData }));
    } catch (error) {
      console.error("Error updating customer support:", error);
    }
  };

  const cancelUpdate = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="updateOwner">
      <div className="updateOwnerTitleContainer">
        <h1 className="updateOwnerTitle">Customer Support</h1>
        <Link to="/customerSupportList">
          <button className="updateOwnerAddButton">Go Back</button>
        </Link>
      </div>
      <div className="updateOwnerBottom">
        <form className="updateOwnerForm" onSubmit={handleSubmit}>
          <div className="updateOwnerFormLeft">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Name" onChange={handleChange} value={customerSupportData.name || ""}/>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Email" onChange={handleChange} value={customerSupportData.email || ""}/>
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" placeholder="Subject" onChange={handleChange} value={customerSupportData.subject || ""}/>
            <label htmlFor="message">Message</label>
            <input type="text" id="message" name="message" placeholder="Message" onChange={handleChange} value={customerSupportData.message || ""}/>
            <label htmlFor="phoneNo">Phone Number</label>
            <input type="text" id="phoneNo" name="phoneNo" placeholder="Phone Number" onChange={handleChange} value={customerSupportData.phoneNo || ""}/>
          </div>
          <button className="updateOwnerButton" type="submit">Update</button>
        </form>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmation}
        onClose={cancelUpdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Update</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to update this customer support ticket?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelUpdate} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmUpdate} color="primary" autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
