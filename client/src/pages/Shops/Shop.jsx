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
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
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
          <Desc>Open Time : {shop.openingTime} AM</Desc>
          <Desc>Closing Time : {shop.closingTime} PM</Desc>
          <Desc>Contact : {shop.shopPhoneNumber}</Desc>
          <br/>
          
          <Desc>Floot Level : {shop.floorLevel}</Desc>
          <Desc>Shop Number : {shop.shopNumber}</Desc>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
