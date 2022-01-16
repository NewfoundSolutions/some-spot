import React from "react";
import { useState } from "react";
import { Offcanvas ,Button } from "react-bootstrap";

const Account = () => {
  const [show, setShow] = useState(false);
  const handleClose = setShow(false);
  const handleShow = setShow(true);

  return (
    <>
      <Button style={{ color: "white" }} onClick={handleShow}>
        Account
      </Button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Account Display</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body></Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Account;
