
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Announcement from "../../components/Announcement";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import { publicRequest } from "../../requestMethods";
import "./shopPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";

const ShopPage = () => {
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [floorFilter, setFloorFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await publicRequest.get("/shops/find");
        setShops(response.data.shops);
        setFilteredShops(response.data.shops);
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };

    fetchShops();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const filtered = shops.filter(
      (shop) =>
        shop.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        shop.category.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredShops(filtered);
  };

  const handleFloorFilterChange = (event) => {
    setFloorFilter(event.target.value);
    const filtered = shops.filter(
      (shop) => !event.target.value || shop.floorLevel.toString() === event.target.value
    );
    setFilteredShops(filtered);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
    const filtered = shops.filter(
      (shop) => !event.target.value || shop.category.toLowerCase() === event.target.value.toLowerCase()
    );
    setFilteredShops(filtered);
  };

  const handleSortChange = () => {
    const sortedShops = [...filteredShops].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setFilteredShops(sortedShops);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <Announcement />
      <Navbar />
      <div className="banner-section">
        <h1 className="title">Discover EZY-Mall: Your Shopping Destination</h1>
        <p className="subtitle">
          Welcome to EZY-Mall's Shop List Page. Explore a curated selection of
          stores offering fashion, electronics, and more. Find your favorites or
          uncover new treasures all in one convenient location. Begin your
          shopping journey today at EZY-Mall.
        </p>
        <form className="form-inline">
          <div className="d-flex justify-content-center">
            <input
              type="search"
              placeholder="Search for your favorite store"
              value={searchTerm}
              onChange={handleSearchChange}
              className="form-control mr-sm-2 search-input"
            />
          </div> <br />
          <div
            className="d-flex justify-content-center pb-2"
            style={{ color: "blue", fontWeight: "bold", fontSize: "1.1rem" }}
          >
            Filter By :
          </div>

          <div className="row">
            <div className="col">
              <select
                className="form-control mr-sm-2"
                value={floorFilter}
                onChange={handleFloorFilterChange}
                style={{ color: "blue" }}
              >
                <option value="">Floor Level</option>
                {[...new Set(shops.map((shop) => shop.floorLevel))].map(
                  (floorLevel) => (
                    <option
                      key={floorLevel}
                      value={floorLevel}
                      style={{ color: "blue" }}
                    >
                      {floorLevel}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="col">
              <select
                className="form-control mr-sm-2"
                value={categoryFilter}
                onChange={handleCategoryFilterChange}
                style={{ color: "blue" }}
              >
                <option value="">Category</option>
                {[...new Set(shops.map((shop) => shop.category))].map(
                  (category) => (
                    <option
                      key={category}
                      value={category}
                      style={{ color: "blue" }}
                    >
                      {category}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="col">
              <button
                type="button"
                className="form-control mr-sm-2"
                onClick={handleSortChange}
                style={{ marginRight: "10px", color: "blue" }}
              >
                Sort {sortOrder === "asc" ? "(A-Z)" : "(Z-A)"}
              </button>
            </div>
          </div>
          
        </form>
      </div>

      <div className="section">
        <h1 className="title2">Featured Stores</h1>

        <div className="categories-wrapper">
          {filteredShops.map((shop, index) => (
            <div
              style={{
                width: "18rem",
                marginBottom: "20px",
                cursor: "pointer",
              }}
              onClick={() => (window.location.href = `/shops/${shop._id}`)}
              key={index}
            >
              <Card>
                <Card.Img
                  variant="top"
                  src={shop.image}
                  alt={shop.name}
                  className="card-img"
                />
                <Card.Body>
                  <Card.Title>{shop.name}</Card.Title>
                  <div style={{ textAlign: "left" }}>
                    <Card.Text>Category : {shop.category}</Card.Text>
                    <Card.Text>Floor Level : {shop.floorLevel}</Card.Text>
                    <Card.Text>Shop No : {shop.shopNumber}</Card.Text>
                    <Card.Text>Mobile : {shop.shopPhoneNumber}</Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default ShopPage;

