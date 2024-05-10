import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/userRedux";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


const Navbarx = () => {
  const { quantity } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">EZY-Mall</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">HOME</Nav.Link>
            <Nav.Link href="/shops">SHOPS</Nav.Link>
            <Nav.Link href="/">PRODUCTS</Nav.Link>
            <Nav.Link href="/parking">PARKING</Nav.Link>
            <Nav.Link href="/slotPages">SLOTS</Nav.Link>
          </Nav>

          <Nav>
            {!user ? (
              <>
                <Nav.Link href="/login"><button type="button" class="btn btn-primary">LOGIN</button></Nav.Link>
                <Nav.Link href="/register"><button type="button" class="btn btn-outline-success">REGISTER</button></Nav.Link>
              </>
            ) : (
              <button onClick={handleLogout} type="button" class="btn btn-outline-danger">Logout</button>
            )}
          </Nav>
        </Container>
      </Navbar>
      
    </>
  );
};

export default Navbarx;


{/* Old Navbar code - u can use this also working-2024/04/29 -11.51AM */}
{/*
import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/userRedux";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 16px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  font-size: 24px;
  ${mobile({ fontSize: "20px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 16px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "14px", marginLeft: "10px" })}
  color: gray;
  text-decoration: none;
  transition: color 0.3s, font-weight 0.3s; 
  &:hover {
    color: black;
    font-weight: bold;
  }
`;

const Navbar = () => {
  const { quantity } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
          <Link to="/">
            <MenuItem>HOME</MenuItem>
          </Link>
          <Link to="/shops">
            <MenuItem>SHOPS</MenuItem>
          </Link>
          <Link to="/">
            <MenuItem>PRODUCTS</MenuItem>
          </Link>
        </Left>
        <Center>
          <Logo>HELLO.</Logo>
        </Center>
        <Right>
          {!user ? (
            <>
              <Link to="/register">
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link to="/login">
                <MenuItem>Sign In</MenuItem>
              </Link>
            </>
          ) : (
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          )}
          <Link to={"/cart"}>
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

 */}