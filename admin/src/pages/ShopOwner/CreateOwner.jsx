import "../shop/createShop.css";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { addOwner } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function CreateOwner() {
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the process starts

    const file = image;

    if (!file) {
      setError("Please select an image");
      setLoading(false); // Reset loading when an error occurs
      return;
    }

    if (!inputs.name || !inputs.email || !inputs.nic || !inputs.phone) {
      setError("Please fill in all fields");
      setLoading(false); // Reset loading when an error occurs
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
      (error) => {
        console.log(error);
        setLoading(false); // Reset loading when an error occurs
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const ownerData = {
            ...inputs,
            image: downloadURL,
          };
          addOwner(ownerData, dispatch)
            .then(() => {
              setInputs({}); // Reset form inputs
              setImage(null); // Reset image state
              setLoading(false); // Reset loading when the process completes
            })
            .catch((error) => {
              console.error("Error creating shop owner:", error);
              setLoading(false); // Reset loading when an error occurs
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
            value={inputs.name || ""}
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
            value={inputs.email || ""}
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
            value={inputs.nic || ""}
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
            value={inputs.phone || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="addShopItem">
          <label></label>
          <button onClick={handleClick} className="addShopButton" disabled={loading}>
            {loading ? "Creating Owner..." : "Create Owner"}
          </button>
        </div>
      </form>
    </div>
  );
}
