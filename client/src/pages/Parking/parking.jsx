import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Using React Router v6 for navigation
import { useDispatch } from "react-redux";
import Navbar from "../../components/Navbar";
import Announcement from "../../components/Announcement";
import Footer from "../../components/Footer";
import Newsletter from "../../components/Newsletter";
import { mobile } from "../../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  justify-content: center; /* Center the content horizontally */
  flex-wrap: wrap; /* Allow content to wrap to the next line */
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const Slot = styled.div`
  width: 100px;
  height: 100px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  background-color: ${props => props.isBooked ? '#ff6347' : '#90ee90'};
  color: white;
  font-weight: bold;
  cursor: ${props => props.isBooked ? 'not-allowed' : 'pointer'};
`;

const InfoContainer = styled.div`
  padding: 0px 50px;
  ${mobile({ padding: "10px", flex: 1 })}
`;

const Title = styled.h1`
  color: blue;
  text-align: center;
  font-weight: bold;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const ParkingLot = () => {
  const navigate = useNavigate();
  const [slots, setSlots] = useState([
    { id: "S1", isBooked: false },
    { id: "S2", isBooked: false },
    { id: "S3", isBooked: false }
  ]);

  useEffect(() => {
    // Simulate fetching data
    const fetchSlots = async () => {
      // Example: You could fetch this data from an API
      setSlots([
        { id: "S1", isBooked: false },
        { id: "S2", isBooked: true },
        { id: "S3", isBooked: false }
      ]);
    };

    fetchSlots();
  }, []);

  const handleSlotClick = (slotId, isBooked) => {
    if (!isBooked) {
      navigate(`/parking-form/${slotId}`); // Navigate to ParkingForm with slot ID as URL parameter
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <InfoContainer>
          <Title>Parking Slots</Title>
          <Desc>Click on an available slot to book it:</Desc>
          {slots.map(slot => (
            <Slot
              key={slot.id}
              isBooked={slot.isBooked}
              onClick={() => handleSlotClick(slot.id, slot.isBooked)}
            >
              {slot.id}
            </Slot>
          ))}
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ParkingLot;
