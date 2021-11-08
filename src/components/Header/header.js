import React from "react";
import { Navbar, Container } from "react-bootstrap";
// import logo from "../../logo192.png";
const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">React Bootstrap</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
