import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateShop } from "../../redux/apiCalls";
import Chart from "../../components/chart/Chart";
import { Publish, Warning } from "@material-ui/icons";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import "./updateShop.css";

export default function UpdateShop() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [shopData, setShopData] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false); // State variable for showing confirmation popup

  useEffect(() => {
    // Fetch shop data based on the ID
    // Replace the following line with your logic to fetch shop data
    const selectedShop = { _id: id, name: "Shop Name", location: "Location", description: "Description", phone: "Phone", ownerName: "Owner Name", email: "Owner Email", image: "Image URL" };
    setShopData(selectedShop);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowConfirmation(true); // Show confirmation popup
  };

  const confirmUpdate = async () => {
    try {
      await updateShop(dispatch, id, shopData);
      setShowConfirmation(false); // Hide confirmation popup
      history.push("/shoplist");
    } catch (error) {
      console.error("Error updating shop:", error);
      // Handle error appropriately, e.g., show error message to user
    }
  };

  const cancelUpdate = () => {
    setShowConfirmation(false); // Hide confirmation popup
  };

  return (
    <div className="updateShop">
      <div className="updateShopTitleContainer">
        <h1 className="updateShopTitle">Shop</h1>
        <Link to="/shoplist">
          <button className="updateShopAddButton">Go Back</button>
        </Link>
      </div>
      <div className="updateShopTop">
        <div className="updateShopTopLeft">
          <Chart data={shopData} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="updateShopTopRight">
          <div className="updateShopInfoTop">
            <img src={shopData.image} alt="" className="updateShopInfoImg" />
            <span className="updateShopName">{shopData.name}</span>
          </div>
          <div className="updateShopInfoBottom">
            <div className="updateShopInfoItem">
              <span className="updateShopInfoKey">Shop id:</span>
              <span className="updateShopInfoValue">{id}</span>
            </div>
            <div className="updateShopInfoItem">
              <span className="updateShopInfoKey">Sales:</span>
              <span className="updateShopInfoValue">5123</span>
            </div>
            <div className="updateShopInfoItem">
              <span className="updateShopInfoKey">Location:</span>
              <span className="updateShopInfoValue">{shopData.location}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="updateShopBottom">
        <form className="updateShopForm" onSubmit={handleSubmit}>
          <div className="updateShopFormLeft">
            <label htmlFor="name">Shop Name</label>
            <input type="text" id="name" name="name" placeholder="Shop Name" onChange={handleChange} value={shopData.name || ""}/>
            <label htmlFor="location">Shop Location</label>
            <input type="text" id="location" name="location" placeholder="Shop Location" onChange={handleChange} value={shopData.location || ""}/>
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" placeholder="Description" onChange={handleChange} value={shopData.description || ""}/>
            <label htmlFor="phone">Contact</label>
            <input type="text" id="phone" name="phone" placeholder="Phone" onChange={handleChange} value={shopData.phone || ""}/>
          </div>
          <div className="updateShopFormRight">
            <div className="updateShopUpload">
              <img src={shopData.image} alt="" className="updateShopUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            {/* New form fields for shop owner details */}
            <label htmlFor="ownerName">Owner Name</label>
            <input type="text" id="ownerName" name="ownerName" placeholder="Owner Name" onChange={handleChange} value={shopData.ownerName || ""}/>
            <label htmlFor="ownerEmail">Owner Email</label>
            <input type="email" id="ownerEmail" name="email" placeholder="Owner Email" onChange={handleChange} value={shopData.email || ""}/>
            <label htmlFor="ownerPhone">Owner Phone</label>
            <input type="text" id="ownerPhone" name="phone" placeholder="Owner Phone" onChange={handleChange} value={shopData.phone || ""}/>
          </div>
          <button className="updateShopButton" type="submit">Update</button>
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
            Are you sure you want to update this shop?
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
