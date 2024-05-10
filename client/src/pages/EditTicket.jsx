import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './editTicket.css'; 
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';

const EditTicket = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  // State to store form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phoneNo: ''
  });

  // Fetch ticket data from the API when component mounts
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/customerSupport/${id}`);
        const ticketData = response.data; // Assuming the API returns ticket data
        // Update formData state with ticket data
        setFormData({
          name: ticketData.name,
          email: ticketData.email,
          subject: ticketData.subject,
          message: ticketData.message,
          phoneNo: ticketData.phoneNo
        });
      } catch (error) {
        console.error('Error fetching ticket data:', error);
        // Handle error, such as displaying an error message to the user
      }
    };

    fetchTicket();
  }, [id]); // Fetch ticket data only when ID changes

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send PUT request to update ticket data
      await axios.put(`http://localhost:5000/api/customerSupport/${id}`, formData);
      alert('Ticket updated successfully!');
      // Redirect to ticket list page after successful update
      navigate('/ticketList');
    } catch (error) {
      console.error('Error updating ticket:', error);
      alert('An error occurred while updating the ticket. Please try again later.');
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <Announcement/>
      <Navbar/>
    <div className="edit-ticket-container">
      <h2>Edit Ticket</h2>
      <form className="edit-ticket-form" onSubmit={handleSubmit}>
        <div className="edit-ticket-item">
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
        <div className="edit-ticket-item">
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
        <div className="edit-ticket-item">
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
        <div className="edit-ticket-item">
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            required
          />
        </div>
        <div className="edit-ticket-item">
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
        <button type="submit" className="edit-ticket-button">Update Ticket</button>
      </form>
    </div>
    <Footer/>
    </div>
  );
};

export default EditTicket;
