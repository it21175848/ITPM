import { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
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
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 500px;
  height: 500px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  ${mobile({ width: "30vh", height: "30vh" })}
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

const Texts = styled.p`
  margin: 20px 0px;
  color: darkgreen;
  font-weight: bold;
`;

const Price = styled.span`
  font-size: 20px;
`;

const Product = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const id = location.pathname.split("/")[2];
  const [shop, setShop] = useState({});
  const [owner, setOwner] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await publicRequest(`/shops/find/${id}`);
        setShop(response.data.shop);
        setLoading(false);
        
        // Fetch owner details based on ownerId
        const ownerResponse = await publicRequest(`/owners/find/${response.data.shop.ownerId}`);
        setOwner(ownerResponse.data.owner);
      } catch (error) {
        console.error("Error fetching shop details:", error);
        setLoading(false);
      }
    };

    fetchShop();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ fontSize: "1.5rem" }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={shop.image} />
        </ImgContainer>
        <InfoContainer>
          
          <Title>{shop.name}</Title>
          <Desc>{shop.description}</Desc>
          <Price style={{ align: "left" }}>
            Shop Category :{" "}
            <span style={{ color: "#3B2F2F", fontWeight: "bold" }}>
              {" "}
              {shop.category}
            </span>
          </Price>
          <br/>
          
          <div style={{ float: "left" }}>
            {/* in below details are the shop's details*/}
            <Texts>
              <span style={{ color: "blue" }}>Open Time :</span>{" "}
              {shop.openingTime} AM
            </Texts>
            <Texts>
              <span style={{ color: "blue" }}>Closing Time :</span>{" "}
              {shop.closingTime} PM
            </Texts>
            <Texts>
              <span style={{ color: "blue" }}>Contact :</span>{" "}
              {shop.shopPhoneNumber}
            </Texts>
            <Texts>
              <span style={{ color: "#3B2F2F" }}>Floor Level :</span>{" "}
              {shop.floorLevel}
            </Texts>
            <Texts>
              <span style={{ color: "#3B2F2F" }}>Shop Number :</span>{" "}
              {shop.shopNumber}
            </Texts>
          </div>
          <div style={{ float: "right" }}>
            {/* in below details are the shop's onwer's details*/}
            <Texts>
              <span style={{ color: "blue" }}>Shop Owner :</span> {owner.name}
            </Texts>
            <Texts>
              <span style={{ color: "blue" }}>Email :</span> {owner.email}
            </Texts>
            <Texts>
              <span style={{ color: "blue" }}>Phone :</span> {owner.phone}
            </Texts>
          </div>

        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
