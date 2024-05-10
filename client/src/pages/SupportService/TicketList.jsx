import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TicketList.css'; // Import CSS for TicketList styling
import Announcement from '../../components/Announcement';
import Navbar from '../../components/Navbar';
import Footer from "../../components/Footer";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Fetch ticket list from API when the component mounts
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/customerSupport/');
        setTickets(response.data); 
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
    return () => {
    };
  }, []);
  const handleEdit = (ticketId) => {
    // Construct the edit page URL with the ticket ID as a parameter
    const editPageUrl = `/editTicket/${ticketId}`;
    
    // Redirect to the edit page
    window.location.href = editPageUrl;
  };

  const handleDelete = async (ticketId) => {
    // Implement delete functionality
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        await axios.delete(`http://localhost:5000/api/customerSupport/${ticketId}`);
        setTickets(tickets.filter(ticket => ticket._id !== ticketId)); // Corrected to use '_id' for MongoDB documents
        console.log('Ticket deleted successfully');
      } catch (error) {
        console.error('Error deleting ticket:', error);
        // Handle error, such as displaying an error message to the user
      }
    }
  };

  return (
    <div>
      <Announcement />
      <Navbar />
      <div className="ticket-list-container">
        <h2>Ticket List</h2>
        <table className="ticket-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket._id}> {/* Corrected to use '_id' for MongoDB documents */}
                <td>{ticket.subject}</td>
                <td>{ticket.name}</td>
                <td>{ticket.email}</td>
                <td>{ticket.message}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(ticket._id)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(ticket._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer /> {/* Include the Footer component */}
    </div>
  );
};

export default TicketList;
