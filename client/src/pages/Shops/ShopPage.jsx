import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Announcement from '../../components/Announcement';
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import Slider from "../../components/Slider";
import { publicRequest } from '../../requestMethods'; // Import userRequest from your request file
import './shopPage.css'; // Import CSS file

const ShopPage = () => {
  // State to store shop data and category filter
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch shop data when component mounts
  useEffect(() => {
    const fetchShops = async () => {
      try {
        // Fetch shop data from server using userRequest instance
        const response = await publicRequest.get('/shops/find'); // Adjust the endpoint accordingly
        setShops(response.data.shops);
        setFilteredShops(response.data.shops); // Initialize filtered shops with all shops
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };

    fetchShops();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Filter shops based on search term
    const filtered = shops.filter(shop =>
      shop.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredShops(filtered);
  };

  return (
    <>
      <Announcement />
      <Navbar />
      <div className="container">
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
          <div className="categories-wrapper">
            {filteredShops.map((shop, index) => (
              <Link to={`/shops/${shop._id}`} key={index} className="shop-link"> {/* Link to shop page */}
                <div className="category-card">
                  <img src={shop.image} alt={shop.name} className="category-image" />
                  <h2 className="category-title">{shop.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </>
  );
};

export default ShopPage;
