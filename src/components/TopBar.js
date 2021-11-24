import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const TopBar = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="top" >
      <Container fluid >
        <Navbar.Brand href="#home">Some Spot B'y</Navbar.Brand>
    <Nav className="ml-auto" >
      <Nav.Link href="#login" >Login</Nav.Link>
    </Nav>
    
    
    </Container>
  </Navbar>
  )
}

export default TopBar
