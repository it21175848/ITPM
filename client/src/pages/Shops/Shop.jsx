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
  max-width: 80%;
  max-height: 80vh;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  ${mobile({ height: "30vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await publicRequest(`/shops/find/${id}`);
        setShop(response.data.shop);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shop details:", error);
        setLoading(false);
      }
    };

    fetchShop();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
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
          <Price>Shop Category : {shop.category}</Price>
          <Texts>Open Time : {shop.openingTime} AM</Texts>
          <Texts>Closing Time : {shop.closingTime} PM</Texts>
          <Texts>Contact : {shop.shopPhoneNumber}</Texts>
          <Texts>Floor Level : {shop.floorLevel}</Texts>
          <Texts>Shop Number : {shop.shopNumber}</Texts>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
