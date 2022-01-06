import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Icon } from "@iconify/react";
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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const setToken = (data) => props.updateParent(data);

  const handleSignin = async (e) => {
    e.preventDefault();
    const payload = { email: formState.email, password: formState.password };
    console.log("form payload is: ", payload);
    axios
      .post(
        "/users/login",
        { email: formState.email, password: formState.password },
        headers
      )
      .then((res) => {
        console.log("res.data.token is", res.data.token)
        setToken({token: res.data.token});
      })
      .catch((err) => console.log(err));
  };

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    console.log(formState);
  };

  return (
    <>
      <div onClick={handleShow} className="mr-2" style={iconStyle}>
        Sign-In
        <Icon style={iconStyle} icon="line-md:account-add" />
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
                  We'll never share your email with anyone else.
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
              <Button variant="primary" onClick={handleSignin} type="submit">
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
