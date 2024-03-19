import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateShop } from "../../redux/apiCalls";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import "./updateShop.css";

export default function UpdateShop() {
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
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Shop</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={shopData} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={shopData.image} alt="" className="productInfoImg" />
            <span className="productName">{shopData.name}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Shop id:</span>
              <span className="productInfoValue">{id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Location:</span>
              <span className="productInfoValue">{shopData.location}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={handleSubmit}>
          <div className="productFormLeft">
            <label htmlFor="name">Shop Name</label>
            <input type="text" id="name" name="name" placeholder="Shop Name" onChange={handleChange} value={shopData.name || ""}/>
            <label htmlFor="location">Shop Location</label>
            <input type="text" id="location" name="location" placeholder="Shop Location" onChange={handleChange} value={shopData.location || ""}/>
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" placeholder="Description" onChange={handleChange} value={shopData.description || ""}/>
            <label htmlFor="contact">Contact</label>
            <input type="text" id="contact" name="contact" placeholder="Contact" onChange={handleChange} value={shopData.contact || ""}/>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={shopData.image} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton" type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
