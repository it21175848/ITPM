import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateOwner } from "../../redux/apiCalls";
import Chart from "../../components/chart/Chart";
import { Publish, Warning } from "@material-ui/icons";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import "./updateOwner.css";

export default function UpdateOwner() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const owners = useSelector((state) => state.owner.owners);
  const [ownerData, setOwnerData] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false); // State variable for showing confirmation popup

  useEffect(() => {
    const selectedOwner = owners.find((owner) => owner._id === id);
    setOwnerData(selectedOwner);
  }, [id, owners]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOwnerData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowConfirmation(true); // Show confirmation popup when updating
  };

  const confirmUpdate = async () => {
    try {
      await updateOwner(dispatch, id, ownerData);
      setShowConfirmation(false); // Hide confirmation popup
      history.push("/ownerlist");
    } catch (error) {
      console.error("Error updating owner:", error);
      // Handle error appropriately, e.g., show error message to user
    }
  };

  const cancelUpdate = () => {
    setShowConfirmation(false); // Hide confirmation popup
  };

  return (
    <div className="updateOwner">
      <div className="updateOwnerTitleContainer">
        <h1 className="updateOwnerTitle">Owner</h1>
        <Link to="/ownerlist">
          <button className="updateOwnerAddButton">Go Back</button>
        </Link>
      </div>
      <div className="updateOwnerTop">
        <div className="updateOwnerTopLeft">
          {/* Chart component */}
          <Chart data={ownerData} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="updateOwnerTopRight">
          <div className="updateOwnerInfoTop">
            {/* Owner image */}
            <img src={ownerData.image} alt="" className="updateOwnerInfoImg" />
            {/* Owner name */}
            <span className="updateOwnerName">{ownerData.name}</span>
          </div>
          <div className="updateOwnerInfoBottom">
            {/* Owner details */}
            <div className="updateOwnerInfoItem">
              <span className="updateOwnerInfoKey">Owner id:</span>
              <span className="updateOwnerInfoValue">{id}</span>
            </div>
            <div className="updateOwnerInfoItem">
              <span className="updateOwnerInfoKey">Email:</span>
              <span className="updateOwnerInfoValue">{ownerData.email}</span>
            </div>
            <div className="updateOwnerInfoItem">
              <span className="updateOwnerInfoKey">NIC:</span>
              <span className="updateOwnerInfoValue">{ownerData.nic}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="updateOwnerBottom">
        <form className="updateOwnerForm" onSubmit={handleSubmit}>
          <div className="updateOwnerFormLeft">
            {/* Input fields for updating owner details */}
            <label htmlFor="name">Owner Name</label>
            <input type="text" id="name" name="name" placeholder="Owner Name" onChange={handleChange} value={ownerData.name || ""}/>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Email" onChange={handleChange} value={ownerData.email || ""}/>
            <label htmlFor="nic">NIC</label>
            <input type="text" id="nic" name="nic" placeholder="NIC" onChange={handleChange} value={ownerData.nic || ""}/>
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" name="phone" placeholder="Phone" onChange={handleChange} value={ownerData.phone || ""}/>
          </div>
          <div className="updateOwnerFormRight">
            {/* Upload image section */}
            <div className="updateOwnerUpload">
              <img src={ownerData.image} alt="" className="updateOwnerUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
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
            Are you sure you want to update this owner?
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
