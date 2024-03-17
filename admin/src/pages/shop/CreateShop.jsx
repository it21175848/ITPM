import "./createShop.css"; // Import your CSS file for styling
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { createShop } from "../../redux/apiCalls"; // Assuming you have an addShop function for the shop API call
import { useDispatch } from "react-redux";

export default function CreateShop() {
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const file = image;

    if (!file) return;

    const sotrageRef = ref(storage, `shops/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle progress if needed
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const shopData = {
            ...inputs,
            category,
            image: downloadURL,
          };
          createShop(shopData, dispatch);
          setInputs({});
          setImage(null);
          setCategory("");
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
          <label>Location</label>
          <input
            name="location"
            type="text"
            placeholder="Enter shop location"
            onChange={handleChange}
          />
        </div>
        <div className="addShopItem">
          <label>Contact Information</label>
          <input
            name="contact"
            type="text"
            placeholder="Enter contact information"
            onChange={handleChange}
          />
        </div>
        <div className="addShopItem">
          <label>Opening Hours</label>
          <input
            name="openingHours"
            type="text"
            placeholder="Enter opening hours"
            onChange={handleChange}
          />
        </div>
        <button onClick={handleClick} className="addShopButton">
          Create Shop
        </button>
      </form>
    </div>
  );
}
