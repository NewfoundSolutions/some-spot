import React from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import { Icon } from '@iconify/react';
import accountAdd from '@iconify/icons-line-md/account-add';
import { useState } from "react";
import axios from "axios";

const iconStyle = {
  color: "#006400",
  fontSize: "1.5rem",
};

function SignupModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formState, setFormState] = useState({
    email: "",
    name: "",
    password: "",
    passwordRepeat: "",
    submited: false,
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
    if (formState.password === formState.passwordRepeat && formState.password.length >= 6) {
      const formData = Object.assign(
        {},
        formState,
        { entries: [] },
        { register_date: Date.now() }
        );
        // console.log("Form should be done: ", formData);
        setFormState({ submited: true });
        axios
        .post("/users/new", formData)
        .then((res) => {
          if (res.status === 200) {
            handleClose();
          }
          props.updateParent({ token: res.data.token });
          props.updateParent({ loggedIn: formState.email });
        })
        .catch((err) => console.log(err));
      };
    }
      
      return (
        <>
      <div onClick={handleShow} className="mr-2" style={{fontSize: "1rem", color: "white"}}>
        Sign Up
        <Icon style={iconStyle} icon={accountAdd} />
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
              <Form.Group className="mb-3" controlId="passwordRepeat">
                <Form.Label>Re-Enter Your Password</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  type="password"
                  placeholder="One more time"
                />
                <Form.Text className="text-muted">
                  {formState.password === formState.passwordRepeat && formState.passwordRepeat !== '' ? "Great!": "Passwords must match, and be at least six characters long"}
                </Form.Text>
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              {formState.submited ? (
                <Button variant="primary" disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </Button>
              ) : (
                <Button variant="primary" onClick={onSubmit} type="submit">
                  Sign Up
                </Button>
              )}
            </Modal.Footer>
          </Form>
        </Modal.Dialog>
      </Modal>
    </>
  );
}

export default SignupModal;
