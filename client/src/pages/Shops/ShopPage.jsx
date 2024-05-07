import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Announcement from '../../components/Announcement';
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import { publicRequest } from '../../requestMethods';
import './shopPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

const ShopPage = () => {
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous"></link>
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await publicRequest.get('/shops/find');
        setShops(response.data.shops);
        setFilteredShops(response.data.shops);
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };

    fetchShops();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const filtered = shops.filter(shop =>
      shop.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredShops(filtered);
  };

  return (
    <div>
      <Announcement />
      <Navbar />
      <div className="banner-section">
        <h1 className="title">Discover EZY-Mall: Your Shopping Destination</h1>
        <p className="subtitle">
          Welcome to EZY-Mall's Shop List Page. Explore a curated selection of stores offering fashion, electronics, and more. Find your favorites or uncover new treasures all in one convenient location. Begin your shopping journey today at EZY-Mall.
        </p>
        <form class="form-inline">
          <input
            type="search"
            placeholder="Search for your favorite store"
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control mr-sm-2 search-input"
          />
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
                    <Card.Text>{shop.category}</Card.Text>
                    <Card.Text>Floor : {shop.floorLevel}</Card.Text>
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
