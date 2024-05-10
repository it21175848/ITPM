import "./customerSupport.css"; // Import the same CSS file for styling
import Announcement from '../../components/Announcement';
import Navbar from '../../components/Navbar';
import Footer from "../../components/Footer";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; // Import useHistory hook

export default function CustomerSupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phoneNo: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to create support ticket
      const response = await axios.post('http://localhost:5000/api/customerSupport/', formData);
      if (response.status === 200) {
        alert('Support ticket submitted successfully!');
        // Optionally, you can clear the form fields after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          phoneNo: ''
        });
        navigate('/'); // Redirect to home page after successful submission
      } else {
        alert('Failed to submit support ticket. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting support ticket:', error);
      alert('An error occurred while submitting the support ticket. Please try again later.');
    }
  };

  return (
    <div>
      <Announcement />
      <Navbar /> 
      <div className="newShop">
      <Link to="/TicketList">
      <button type="submit" className="addShopButton">Ticket List</button>
      </Link>
        <h1 className="addShopTitle">Customer Support</h1>
        <form className="addShopForm" onSubmit={handleSubmit}>
          <div className="addShopItem">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="addShopItem">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="addShopItem">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              required
            />
          </div>
          <div className="addShopItem">
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              required
            />
          </div>
          <div className="addShopItem">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <button type="submit" className="addShopButton">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}