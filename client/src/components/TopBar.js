import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import { DropdownButton,Button} from "react-bootstrap";
import LoginModal from "./LoginModal";
import UploadModal from "./UploadModal";
import SignupModal from "./SignupModal";
import axios from "axios";
// import Account from "./Account";

class TopBar extends React.Component {
  updateParent(value) {
    this.props.updateActive(value);
  }

  PreAuth = () => {
    return (
      <DropdownButton
        menuVariant="dark"
        variant="dark"
        id="dropdown-basic-button"
        // style={{ overflowY: "visible", overflowX: "visible" }}
        size="md"
        title="Account"
      >
        <Dropdown.Item >
          <Nav>
            {" "}
            <LoginModal updateParent={this.updateParent.bind(this)} />
          </Nav>
        </Dropdown.Item>
        <Dropdown.Item >
          <Nav>
            <SignupModal updateParent={this.updateParent.bind(this)} />
          </Nav>
        </Dropdown.Item>
      </DropdownButton>
    );
  };
  
  render() {
    return (
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container fluid>
          <Navbar.Brand href="#home">Some Spot B'y</Navbar.Brand>

          {this.props.loggedIn ? (
            <Nav>
              <UploadModal loggedIn={this.props.loggedIn} />{" "}
            </Nav>
          ) : (
            <div id="notSignedIn">Create an account or login to start!</div>
          )}
          {this.props.loggedIn ? <Button variant="dark"style={{ color: "white" }} onClick={()=>axios.get('/users/logout').then(this.updateParent({loggedIn: false, email: ''}))}> Logout</Button> : <this.PreAuth />}
        </Container>
      </Navbar>
    );
  }
}
export default TopBar;
