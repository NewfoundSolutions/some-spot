import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import LoginModal from "./LoginModal";
import UploadModal from "./UploadModal";
import SignupModal from "./SignupModal";

class TopBar extends React.Component {
  updateParent(value) {
    this.props.updateActive(value);
  }



  render() {
    return (
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container fluid>
          <Navbar.Brand href="#home">Some Spot B'y</Navbar.Brand>
           
          {this.props.loggedIn ? <Nav><UploadModal /> </Nav>: "Create an account or login to start!"}
          {!this.props.loggedIn ? <Nav className="ml-auto" > <LoginModal  updateParent={this.updateParent.bind(this)} /></Nav> : <></>}
          {!this.props.loggedIn ? <Nav ><SignupModal updateParent={this.updateParent.bind(this)} /></Nav>:<></>}
        </Container>
      </Navbar>
    );
  }
}
export default TopBar;
