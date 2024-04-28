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
        <h1 className="title">Shopping</h1>
        <p className="subtitle">
          Whatever you want to look for and purchase, you’ll find it here. From iconic stores such as ODEL, Cool Planet,
          Abans and Cargills Food Hall to fun events for the kids; fabulous beauty stores to tempting fashion outlets
          (just think Calvin Klein, Polo, Adidas, Charles & Keith, Mango, Nike and Levis to tasty food outlets &
          refreshing beverages to peaceful areas to watch the world go by.
        </p>
        <input
          type="text"
          placeholder="Search for your favorite store"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
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
