import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import { Divider } from "@mui/material";
import "./newProduct.css"; // Import CSS file for styling

export default function NewProduct() {
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();
  const [userStats, setUserStats] = useState([]);
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user, history]);
  useEffect(() => {
    const getUserStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            {
              name: MONTHS[item._id - 1],
              "Active User": item.total,
            },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getUserStats();
  }, [MONTHS]);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handlecat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const file = image;

    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const Products = { ...inputs, categories: cat, img: downloadURL };
          addProduct(Products, dispatch);
          setInputs({});
          setImage(null);
          setCat([]);
          setOpen(false); // Close the modal after submitting
        });
      }
    );
  };

  return (
    <div className="newProductContainer">
      <div className="buttonContainer">
        {" "}
        {/* Add a container div for the button */}
        <Button variant="contained" onClick={() => setOpen(true)}>
          {" "}
          Add New Product
        </Button>
      </div>
      <div className="newProductContent">
        <FeaturedInfo />
        <Chart
          data={userStats}
          title="User Analytics"
          grid
          dataKey="Active User"
        />
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        className="dialogContainer"
      >
        <DialogTitle>New Product</DialogTitle>
        <DialogContent>
          <form className="formContainer">
            <div className="addProductItem">
              <label>Image</label>
              <input
                type="file"
                id="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="addProductItem">
              <label>Title</label>
              <TextField
                name="title"
                type="text"
                placeholder="Apple Airpods"
                onChange={handleChange}
              />
            </div>

            <div className="addProductItem">
              <label>Description</label>
              <TextField
                name="desc"
                type="text"
                placeholder="Apple Airpods"
                onChange={handleChange}
                fullWidth
              />
            </div>
            <div className="addProductItem">
            <div className="addProductItem">
              <label>Categories</label>
              <TextField
                name="categories"
                type="text"
                placeholder="Categories"
                onChange={handleChange}
                fullWidth
              />
            </div>
            </div>
            <div className="addProductItem">
              <label>Price</label>
              <TextField
                name="price"
                type="number"
                placeholder="Apple Airpods"
                onChange={handleChange}
                fullWidth
              />
            </div>
            <div className="addProductItem">
              <label>Stock</label>
              <Select
                name="inStock"
                id="active"
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </Select>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            variant="contained"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleClick} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
