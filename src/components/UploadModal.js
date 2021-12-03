import React from "react";
import { Modal } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Upload from "./Upload";

const iconStyle = {
  color: "#006400",
  fontSize: "1.5rem",
};

function UploadModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {" "}
      <div onClick={handleShow} className="mr-2" style={iconStyle}>
        New Memory
        <Icon icon="bx:bxs-map-pin" className="location-icon" />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Mark a new Memory!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Upload />
          </Modal.Body>

          <Modal.Footer></Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </>
  );
}

export default UploadModal;
