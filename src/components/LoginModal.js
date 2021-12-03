import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Icon } from '@iconify/react'
import {useState} from 'react'
//just a skeleton from 

const iconStyle = {
  color: '#006400',
  fontSize: '1.5rem' 
}

function LoginModal() {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  
  return (
    <> <div onClick={handleShow} className="mr-2" style={iconStyle}>Account 
      <Icon  style={iconStyle} icon="line-md:account-add" />
      </div>
      <Modal show={show} onHide={handleClose}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Welcome Back!</Modal.Title>
        </Modal.Header>

          <Form>
        <Modal.Body>
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
            
        </Modal.Body>

        <Modal.Footer >
        <Button variant="primary" type="submit">
              Sign In
            </Button>
            <Button variant="secondary" type="submit">
              New User
            </Button>
        </Modal.Footer>
          </Form>
      </Modal.Dialog>
      </Modal>
    </>
  )
}

export default LoginModal;
