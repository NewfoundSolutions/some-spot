import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
//just a skeleton from 



class LoginModal extends React.Component {
  
  render (){
  return (
    <>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Welcome Back!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="loginFormEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="loginFormPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
              <Form.Text className="text-muted">
                And stop reusing the same password everywhere, There's skeets on the go. 
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign In
            </Button>
            <Button variant="secondary" type="submit">
              New User
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </>
  )
}
}
export default LoginModal;
