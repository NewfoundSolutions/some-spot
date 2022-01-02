import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { useState } from "react";
import axios from "axios";

const iconStyle = {
  color: "#006400",
  fontSize: "1.5rem",
};

function SignupModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formState, setFormState] = useState({
    email: "",
    name: "",
    password: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    console.log(formState.name);
  };

  const onSubmit = async (e) => {
     e.preventDefault();
    const formData = Object.assign(
      {},
      formState,
      { entries: [] },
      { register_date: Date.now() }
    );
    // console.log("Form should be done: ", formData);
    axios
      .post("http://192.168.0.14:3001/users/new", formData)
      .then((res) => {
        console.log("success: ", res.body);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div onClick={handleShow} className="mr-2" style={iconStyle}>
        New Account
        <Icon style={iconStyle} icon="line-md:account-add" />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Welcome!</Modal.Title>
          </Modal.Header>
          <Form>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  onChange={handleChange}
                  placeholder="Who's you?"
                />
                <Form.Text className="text-muted">
                  What name would you like to see on your account?
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
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
              <Button variant="primary" onClick={onSubmit} type="submit">
                Sign Up
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Dialog>
      </Modal>
    </>
  );
}

export default SignupModal;
