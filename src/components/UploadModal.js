import React from "react";
import { Modal } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Uploader from "./Uploader";
import PinDrop from "./PinDrop";

const iconStyle = {
  color: "#006400",
  fontSize: "1.4rem",
};

function UploadModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [uploadDone, setUploadDone] = useState(false);

  
    return (
      <>
        <div onClick={handleShow} className="mr-2" style={iconStyle}>
          New Memory
          <Icon icon="bx:bxs-map-pin" className="location-icon" />
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Dialog>
            <Modal.Body>
             {uploadDone ? <h1>"Memory Saved!"</h1> : <Uploader setUploadDone={setUploadDone} /> } 
            </Modal.Body>
            <PinDrop />
          </Modal.Dialog>
        </Modal>
      </>
    );
}

export default UploadModal;
