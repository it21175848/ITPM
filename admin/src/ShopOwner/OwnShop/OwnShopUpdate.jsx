import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateShop } from "../../redux/apiCalls";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import "./updateShop.css";

export default function OwnShopUpdate() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const shops = useSelector((state) => state.shop.shops);
  const [shopData, setShopData] = useState({});

  useEffect(() => {
    const selectedShop = shops.find((shop) => shop._id === id);
    setShopData(selectedShop);
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
    try {
      await updateShop(dispatch, id, shopData);
      history.push("/shoplist");
    } catch (error) {
      console.error("Error updating shop:", error);
      // Handle error appropriately, e.g., show error message to user
    }
  };

  return (
    <div className="updateShop">
  <div className="updateShopTitleContainer">
    <h1 className="updateShopTitle">Shop</h1>
    <Link to="/newproduct">
      <button className="updateShopAddButton">Create</button>
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
        <label htmlFor="contact">Contact</label>
        <input type="text" id="contact" name="contact" placeholder="Contact" onChange={handleChange} value={shopData.contact || ""}/>
      </div>
      <div className="updateShopFormRight">
        <div className="updateShopUpload">
          <img src={shopData.image} alt="" className="updateShopUploadImg" />
          <label htmlFor="file">
            <Publish />
          </label>
          <input type="file" id="file" style={{ display: "none" }} />
        </div>
        <button className="updateShopButton" type="submit">Update</button>
      </div>
    </form>
  </div>
</div>

  );
}
