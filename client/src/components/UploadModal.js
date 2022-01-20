import React from "react";
import { Modal,Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Uploader from "./Uploader";

function UploadModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setUploadDone(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [uploadDone, setUploadDone] = useState(false);

  return (
    <>
      <Button variant="dark" onClick={handleShow} className="mr-2" style={{fontSize: "1rem", color: "white"}}>
        New Memory
        <Icon icon="bx:bxs-map-pin" className="location-icon" />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Dialog>
          <Modal.Body>
            {uploadDone ? (
              <h1>"Memory Saved!"</h1>
            ) : (
              <Uploader loggedIn= {props.loggedIn}setUploadDone={setUploadDone} />
            )}
          </Modal.Body>
          
        </Modal.Dialog>
      </Modal>
    </>
  );
}

export default UploadModal;
