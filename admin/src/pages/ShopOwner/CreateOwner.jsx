import "../shop/createShop.css";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { addOwner } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function CreateOwner() {
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const shops = useSelector((state) => state.shop.shops);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const file = image;

    if (!file) {
      setError("Please select an image");
      return;
    }

    if (!inputs.name || !inputs.email || !inputs.nic || !inputs.phone || !inputs.shopId) {
      setError("Please fill in all fields");
      return;
    }

    setError("");

    const storageRef = ref(storage, `owners/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle progress if needed
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const ownerData = {
            ...inputs,
            image: downloadURL,
          };
          addOwner(ownerData, dispatch)
            .then(() => {
              setInputs({});
              setImage(null);
              history.push("/ownerlist");
            })
            .catch((error) => {
              console.error("Error creating shop owner:", error);
            });
        });
      }
    );
  };

  return (
    <div className="newShop">
      <h1 className="addShopTitle">Add New Shop Owner</h1>
      <form className="addShopForm">
        <div className="addShopItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="addShopItem">
          <label>Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter owner's name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addShopItem">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter owner's email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addShopItem">
          <label>NIC</label>
          <input
            name="nic"
            type="text"
            placeholder="Enter owner's NIC"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addShopItem">
          <label>Mobile Number</label>
          <input
            name="phone"
            type="text"
            placeholder="Enter owner's mobile number"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addShopItem">
          <label>Assign to Shop (ID):</label>
          <select
            name="shopId"
            value={inputs.shopId || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select Shop ID</option>
            {shops.map((shop) => (
              <option key={shop._id} value={shop._id}>
                {shop._id}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleClick} className="addShopButton">
          Create Owner
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
