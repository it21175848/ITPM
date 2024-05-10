import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import Announcement from "../../components/Announcement";
import Footer from "../../components/Footer";
import Newsletter from "../../components/Newsletter";
import { userRequest } from "../../requestMethods";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: white;
`;

const StyledInput = styled.input`
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const StyledLabel = styled.label`
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
`;

const StyledButton = styled.button`
  padding: 10px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMsg = styled.div`
  color: red;
  font-size: 14px;
`;

const ParkingForm = () => {
  const { slotId } = useParams();
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    vehicleType: '',
    duration: '',
    seat: slotId,
  });
  const [availableSlots, setAvailableSlots] = useState(() => {
    // Retrieve available slots from local storage, default to 15 if not found
    const storedSlots = parseInt(localStorage.getItem('availableSlots'), 10);
    return isNaN(storedSlots) ? 15 : storedSlots;
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current available slots when the component mounts
    fetchAvailableSlots();
  }, []);

  const fetchAvailableSlots = async () => {
    try {
      const response = await userRequest.get(`/parking/available`);
      setAvailableSlots(response.data.availableSlots);
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.vehicleNumber) newErrors.vehicleNumber = 'Vehicle number is required';
    if (!formData.vehicleType) newErrors.vehicleType = 'Vehicle type is required';
    if (!formData.duration || isNaN(formData.duration) || formData.duration <= 0) newErrors.duration = 'Duration must be a positive number';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await userRequest.post('/parking', formData);
        console.log('Form Data:', response.data);
        alert('Parking booked successfully!');
        setErrors({});
        setFormData({
          vehicleNumber: '',
          vehicleType: '',
          duration: '',
          seat: slotId,
        });
        // After successful booking, decrease the available slots and navigate back to the homepage
        const updatedSlots = availableSlots - 1;
        setAvailableSlots(updatedSlots);
        // Store the updated available slots in local storage
        localStorage.setItem('availableSlots', updatedSlots.toString());
        navigate('/');
      } catch (error) {
        console.error('Error creating parking:', error);
        alert('An error occurred while booking parking. Please try again.');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Announcement />
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <h1>Book Your Parking Slot</h1>
          <StyledLabel>
            Vehicle Number:
            <StyledInput type="text" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} />
            {errors.vehicleNumber && <ErrorMsg>{errors.vehicleNumber}</ErrorMsg>}
          </StyledLabel>
          <StyledLabel>
            Vehicle Type:
            <StyledInput type="text" name="vehicleType" value={formData.vehicleType} onChange={handleChange} />
            {errors.vehicleType && <ErrorMsg>{errors.vehicleType}</ErrorMsg>}
          </StyledLabel>
          <StyledLabel>
            Duration (hours):
            <StyledInput type="number" name="duration" value={formData.duration} onChange={handleChange} />
            {errors.duration && <ErrorMsg>{errors.duration}</ErrorMsg>}
          </StyledLabel>
          {/* Input field for the slot (non-editable) */}
          <StyledLabel>
            Slot:
            <StyledInput type="text" name="seat" value={formData.seat} onChange={handleChange} readOnly />
          </StyledLabel>
          <StyledLabel>
            Overall Available Slots: {availableSlots}
          </StyledLabel>
          <StyledButton type="submit">Submit</StyledButton>
        </StyledForm>
      </FormContainer>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ParkingForm;
