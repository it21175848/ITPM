import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateShop } from "../../redux/apiCalls";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import "./updateShop.css";

export default function UpdateShop() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const shops = useSelector((state) => state.shop.shops);
  const [shopData, setShopData] = useState({});
  const [ownerData, setOwnerData] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false); // State variable for showing confirmation dialog

  useEffect(() => {
    const selectedShop = shops.find((shop) => shop._id === id);
    setShopData(selectedShop);
    // Assuming owner details are part of the shop data fetched from the server
    setOwnerData(selectedShop.owner || {});
  }, [id, shops]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowConfirmation(true); // Show confirmation dialog
  };

  const confirmUpdate = async () => {
    try {
      // Update the shop data with the owner details
      const updatedShopData = {
        ...shopData,
        owner: ownerData
      };
      await updateShop(dispatch, id, updatedShopData);
      setShowConfirmation(false); // Hide confirmation dialog
      history.push("/shoplist");
    } catch (error) {
      console.error("Error updating shop:", error);
      // Handle error appropriately, e.g., show error message to user
    }
  };

  const cancelUpdate = () => {
    setShowConfirmation(false); // Hide confirmation dialog
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
              <span className="updateShopInfoKey">Floor Level:</span>
              <span className="updateShopInfoValue">{shopData.floorLevel}</span>
            </div>
            <div className="updateShopInfoItem">
              <span className="updateShopInfoKey">Shop Number:</span>
              <span className="updateShopInfoValue">{shopData.shopNumber}</span>
            </div>
            <div className="updateShopInfoItem">
              <span className="updateShopInfoKey">Onwer ID:</span>
              <span className="updateShopInfoValue">{shopData.ownerId}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="updateShopBottom">
        <form className="updateShopForm" onSubmit={handleSubmit}>
          <div className="updateShopFormLeft">
            <label htmlFor="name">Shop Name</label>
            <input type="text" id="name" name="name" placeholder="Shop Name" onChange={handleChange} value={shopData.name || ""}/>
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" placeholder="Description" onChange={handleChange} value={shopData.description || ""}/>
            <label htmlFor="shopPhoneNumber">Shop Contact</label>
            <input type="text" id="shopPhoneNumber" name="shopPhoneNumber" placeholder="Phone" onChange={handleChange} value={shopData.shopPhoneNumber || ""}/>

            {/* New form fields for floor level and shop number */}
            <label htmlFor="floorLevel">Floor Level</label>
            <select id="floorLevel" name="floorLevel" onChange={handleChange} value={shopData.floorLevel || ""}>
              <option value="">Select Floor Level</option>
              <option value="Basement">Basement</option>
              <option value="1st Floor">1st Floor</option>
              <option value="2nd Floor">2nd Floor</option>
              <option value="3rd Floor">3rd Floor</option>
              <option value="4th Floor">4th Floor</option>
            </select>
            <label htmlFor="shopNumber">Shop Number</label>
            <select id="shopNumber" name="shopNumber" onChange={handleChange} value={shopData.shopNumber || ""}>
              <option value="">Select Shop Number</option>
              {[...Array(40)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  Shop {index + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="updateShopFormRight">
            <div className="updateShopUpload">
              <img src={shopData.image} alt="" className="updateShopUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            {/* New form fields for owner details */}
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
        <DialogTitle id="alert-dialog-title"        >Confirm Update</DialogTitle>
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
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

