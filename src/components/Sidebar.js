import { React, useState } from "react";
import { Button, Offcanvas, Form } from "react-bootstrap";
import Image from 'react-bootstrap/Image'

function Sidebar(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Image rounded="true" src=""/>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Memory Name</Form.Label>
              <Form.Control type="text" placeholder="Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupDesc">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows="3" placeholder="Description"/>
            </Form.Group>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
