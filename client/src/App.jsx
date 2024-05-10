import { Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import ShopPage from "./pages/Shops/ShopPage";
import Shop from "./pages/Shops/Shop"
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Newsletter from "./components/Newsletter";
import Announcement from "./components/Announcement";
import  ParkingLot from "./pages/Parking/parking";
import ParkingForm from "./pages/Parking/parkingForm";

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:category" element={<ProductList />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/success" element={<Success />} />
      <Route path="/shops" element={<ShopPage />} />
      <Route path="/shops/:id" element={<Shop />} />
      <Route path="/parking" element={<ParkingLot />} />
      <Route path="/parking-form/:slotId" element={<ParkingForm />} />
  
    </Routes>
  );
};

export default App;
