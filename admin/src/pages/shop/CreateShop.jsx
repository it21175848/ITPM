import "./createShop.css";
import { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { createShop, getOwners } from "../../redux/apiCalls"; // Import the getOwners function
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function CreateShop() {
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [floorLevel, setFloorLevel] = useState("");
  const [shopNumber, setShopNumber] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [selectedOwner, setSelectedOwner] = useState(""); // State for selected shop owner
  const [shopPhoneNumber, setShopPhoneNumber] = useState(""); // State for shop phone number
  const owners = useSelector((state) => state.owner.owners); // Fetch owners from Redux store
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    getOwners(dispatch); // Fetch owners when component mounts
  }, [dispatch]);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleFloorLevelChange = (e) => {
    setFloorLevel(e.target.value);
  };

  const handleShopNumberChange = (e) => {
    setShopNumber(e.target.value);
  };

  const handleOpeningTimeChange = (e) => {
    setOpeningTime(e.target.value);
  };

  const handleClosingTimeChange = (e) => {
    setClosingTime(e.target.value);
  };

  const handleOwnerChange = (e) => {
    setSelectedOwner(e.target.value); // Set selected owner
  };

  const handleShopPhoneNumberChange = (e) => {
    setShopPhoneNumber(e.target.value); // Set shop phone number
  };

  const handleClick = (e) => {
    e.preventDefault();
    const file = image;

    if (
      !file ||
      !inputs.name ||
      !inputs.description ||
      !category ||
      !openingTime ||
      !closingTime ||
      !floorLevel ||
      !shopNumber ||
      !selectedOwner || // Ensure selected owner is not empty
      !shopPhoneNumber // Ensure shop phone number is filled in
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const storageRef = ref(storage, `shops/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const shopData = {
            ...inputs,
            category,
            image: downloadURL,
            floorLevel,
            shopNumber,
            openingTime,
            closingTime,
            ownerId: selectedOwner, // Pass selected owner ID
            shopPhoneNumber, // Pass shop phone number
          };
          createShop(shopData, dispatch);
          setInputs({});
          setImage(null);
          setCategory("");
          setFloorLevel("");
          setShopNumber("");
          setOpeningTime("");
          setClosingTime("");
          setSelectedOwner("");
          setShopPhoneNumber("");
          history.push("/shoplist");
        });
      }
    );
  };

  return (
    <div className="newShop">
      <h1 className="addShopTitle">Add New Shop</h1>
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
          <label>Shop Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter shop name"
            onChange={handleChange}
          />
        </div>

        <div className="addShopItem">
          <label>Description</label>
          <input
            name="description"
            type="text"
            placeholder="Enter shop description"
            onChange={handleChange}
          />
        </div>

        <div className="addShopItem">
          <label>Category</label>
          <select name="category" onChange={handleCategoryChange} required>
            <option value="">Select Category</option>  {/* Add a default option */}
            <option value="clothing">Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="homeAndGarden">Home & Garden</option>
            <option value="foodAndBeverages">Food & Beverages</option>
            <option value="hobbiesAndCrafts">Hobbies & Crafts</option>
            <option value="sportsAndOutdoors">Sports & Outdoors</option>
            <option value="pets">Pets</option>
            <option value="kidsAndToys">Kids & Toys</option>
            <option value="booksAndMusic">Books & Music</option>
            <option value="luxury">Luxury</option>
            <option value="vintage">Vintage</option>
            <option value="handmade">Handmade</option>
            <option value="sustainable">Sustainable</option>
            <option value="local">Local</option>
            <option value="digitalProducts">Digital Products</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        <div className="addShopItem">
          <label>Opening Time</label>
          <input
            name="openingTime"
            type="time"
            onChange={handleOpeningTimeChange}
            required
          />
        </div>

        <div className="addShopItem">
          <label>Closing Time</label>
          <input
            name="closingTime"
            type="time"
            onChange={handleClosingTimeChange}
            required
          />
        </div>

        <div className="addShopItem">
          <label>Floor Level</label>
          <select name="floorLevel" onChange={handleFloorLevelChange} required>
            <option value="">Select Floor Level</option>
            <option value="Basement">Basement</option>
            <option value="1st Floor">1st Floor</option>
            <option value="2nd Floor">2nd Floor</option>
            <option value="3rd Floor">3rd Floor</option>
            <option value="4th Floor">4th Floor</option>
          </select>
        </div>

        <div className="addShopItem">
          <label>Shop Number</label>
          <select name="shopNumber" onChange={handleShopNumberChange} required>
            <option value="">Select Shop Number</option>
            {[...Array(40)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                Shop {index + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Existing form fields */}
        
        {/* New input field for selecting shop owner */}
        <div className="addShopItem">
          <label>Owner</label>
          <select name="owner" onChange={handleOwnerChange} value={selectedOwner} required>
            <option value="">Select Owner</option>
            {owners.map((owner) => (
              <option key={owner._id} value={owner._id}>
                {owner.name} : {owner._id}
              </option>
            ))}
          </select>
        </div>

        {/* Existing form fields */}
        
        <div className="addShopItem">
          <label>Shop Phone Number</label>
          <input
            name="shopPhoneNumber"
            type="text"
            placeholder="Enter shop phone number"
            onChange={handleShopPhoneNumberChange}
            required
          />
        </div>


        <button onClick={handleClick} className="addShopButton">
          Create Shop
        </button>
      </form>
    </div>
  );
}





