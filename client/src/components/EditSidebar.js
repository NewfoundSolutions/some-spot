import { React } from "react";
import { Offcanvas, Form, Container, Col, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import axios from "axios";
import { useState } from "react";

function EditSidebar(props) {
  const Readable = () => {
    return (
      <Container>
        <Col>{props.name}</Col>
        <Col>
          <Image fluid="true" rounded="true" src={props.url} />
        </Col>
        <Col>{props.desc}</Col>
      </Container>
    );
  };
  const Editable = () => {
    const [formState, setFormState] = useState({
      id: props.id,
      name: props.name,
      desc: props.desc,
      feedback: "",
    });
    const handleUpdate = () => {
      //TODO: Check if post changed from initial state, prompt if no changes.
      axios
        .post("/markers/update", {
          id: formState.id,
          name: formState.name,
          desc: formState.desc,
        })
        .then(props.updateMarker(props.id))
        .then(props.handleClose);
    };


    const handleChange = (e) => {
      e.preventDefault();
      const { id, value } = e.target;
      setFormState((prevState) => ({
        ...prevState,
        [id]: value,
      }));
      // console.log("formstate is",formState);
    };
    const handleDelete = (e) => {
      e.preventDefault();
       const re = new RegExp('(?<=http://res.cloudinary.com/nfsol/image/upload/c_crop,w_300,c_fill/).*?(?=.jpg)');
       const matched = props.url.match(re)
       const pub_id = matched[0].slice((matched[0].indexOf('/')+1),)
      
       //http://res.cloudinary.com/nfsol/image/upload/c_crop,w_300,c_fill/v1643915461/qisqkavo0jp9bsa8gnlx.jpg
      // http://res.cloudinary.com/nfsol/image/upload/v1643915461/qisqkavo0jp9bsa8gnlx.jpg
       console.log("deleting ids:", props.id, pub_id);
      axios
        .delete("/markers/delete", { data: { id: props.id, pub_id:pub_id } })
        .then(props.updateMarker('deleted'))
        .then(props.handleClose);
    };
    return (
      <Form>
        <Image rounded="true" src={props.url} />
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder={props.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="desc">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder={props.desc}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="sidebar-controls">
          <Button variant="dark" type="button" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="danger" type="button" onClick={handleDelete}>
            Delete
          </Button>
        </Form.Group>
      </Form>
    );
  };

  return (
    <>
      <Offcanvas show={props.show} onHide={props.handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Memory Display</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {props.owner === props.user && props.owner !== undefined ? (
            <Editable />
          ) : (
            <Readable />
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default EditSidebar;
