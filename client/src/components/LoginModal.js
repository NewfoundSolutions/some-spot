import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Icon } from "@iconify/react";
import accountCircle from '@iconify/icons-mdi/account-circle';
import { useState } from "react";
import axios from "axios";

//just a skeleton from

const iconStyle = {
  color: "#006400",
  fontSize: "1.5rem",
};
const headers = {
  "Content-Type": "text/plain",
};

function LoginModal(props) {
  const [authFail, setAuthFail] = useState('')
  const [show, setShow] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleSignin = async (e) => {
    e.preventDefault();
    axios
      .post(
        "/users/login",
        { email: formState.email, password: formState.password },
        headers
      )
      .then((res) => {
        // console.log("res.data.message is: ", res.data.message)
        if (res.data.message) setAuthFail(res.data.message);
        props.updateParent({token: res.data.token,loggedIn:true, email: formState.email})
        //props.updateParent({})
        //handleClose();
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    
  };

  return (
    <>
      <div onClick={handleShow} className="mr-2" style={{fontSize: "1rem", color: "white"}}>
        Sign-In
        <Icon style={iconStyle} icon={accountCircle} />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Welcome!</Modal.Title>
          </Modal.Header>
          <Form>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  onChange={handleChange}
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                {authFail}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={formState.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                />
                <Form.Text className="text-muted">
                  And stop reusing the same password everywhere, There's skeets
                  on the go.
                </Form.Text>
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="dark" onClick={handleSignin} type="submit">
                Sign In
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Dialog>
      </Modal>
          
    </>
  );
}

export default LoginModal;
