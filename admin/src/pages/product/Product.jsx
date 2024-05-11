import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { useState } from "react";
import { updateProduct } from "../../redux/apiCalls";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const product = useSelector((state) =>
    state.product.products.find((p) => p._id === productId)
  );
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    title: product?.title,
    desc: product?.desc,
    price: product?.price,

    inStock: product?.inStock,
    img: product?.img,
  });

  console.log("products =>", values);

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log("event =>", e.target.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("object id", product?._id);
    try {
      const res = await updateProduct(dispatch, product?._id, values);
      console.log("response =>", res.data);
    } catch (err) {
      console.log("error =>", err);
    }
  };
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        {/* <Link to="/NewProduct">
          <Button className="productAddButton">Create</Button>
        </Link> */}
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productData} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product?.img} alt="img" className="productInfoImg" />
            <span className="productName">{product?.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{productId}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product?.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={handleSubmit}>
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              name="title"
              type="text"
              value={values.title}
              onChange={handleChange}
            />
            <label>Product Description</label>
            <input
              name="desc"
              type="text"
              value={values.desc}
              onChange={handleChange}
            />
            <label>Price</label>
            <input
              name="price"
              type="number"
              value={values.price}
              onChange={handleChange}
            />
            <label>In Stock</label>
            <select
              value={values.inStock}
              name="inStock"
              id="idStock"
              onChange={handleChange}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product?.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
