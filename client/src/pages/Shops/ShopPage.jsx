import React from 'react';
import styled from 'styled-components';
import Announcement from '../../components/Announcement';
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import Slider from "../../components/Slider";

// Styled components
const Container = styled.div`
  padding: 20px;
`;

const BannerSection = styled.section`
  background-image: url('https://via.placeholder.com/1500x500'); /* Replace with your banner image URL */
  background-size: cover;
  background-position: center;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
`;

const Section = styled.section`
  padding: 50px 0;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 40px;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CategoriesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 40px;
`;

const CategoryCard = styled.div`
  width: 200px;
  margin: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  border-radius: 6px;
`;

const CategoryTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
`;

// Dummy data
const categories = [
  { title: 'Fashion', image: 'https://via.placeholder.com/300' },
  { title: 'Electronics & Lifestyle', image: 'https://via.placeholder.com/300' },
  { title: 'Food & Beverages', image: 'https://via.placeholder.com/300' },
  { title: 'Entertainment', image: 'https://via.placeholder.com/300' },
  { title: 'Happenings', image: 'https://via.placeholder.com/300' },
  { title: 'Accessories', image: 'https://via.placeholder.com/300' },
  { title: 'Books, Gifts & Novelties', image: 'https://via.placeholder.com/300' },
  { title: 'Health, Beauty & Wellness', image: 'https://via.placeholder.com/300' },
  { title: 'Homeware', image: 'https://via.placeholder.com/300' },
  { title: 'Convenience & Services', image: 'https://via.placeholder.com/300' },
];

const ShopPage = () => {
  return (<>
  <Announcement />
    <Navbar />
    <Container>
      
      <BannerSection>
        <Title>Shopping</Title>
        <Subtitle>
          Whatever you want to look for and purchase, you’ll find it here. From iconic stores such as ODEL, Cool Planet,
          Abans and Cargills Food Hall to fun events for the kids; fabulous beauty stores to tempting fashion outlets
          (just think Calvin Klein, Polo, Adidas, Charles & Keith, Mango, Nike and Levis to tasty food outlets &
          refreshing beverages to peaceful areas to watch the world go by.
        </Subtitle>
        <SearchInput type="text" placeholder="Search for your favorite store" />
      </BannerSection>
      <Section>
        <CategoriesWrapper>
          {categories.map((category, index) => (
            <CategoryCard key={index}>
              <CategoryImage src={category.image} alt={category.title} />
              <CategoryTitle>{category.title}</CategoryTitle>
            </CategoryCard>
          ))}
        </CategoriesWrapper>
      </Section>
      
    </Container>
    <Newsletter />
      <Footer />
  </>);
};

export default ShopPage;
