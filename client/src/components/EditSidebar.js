import { React} from "react";
import { Offcanvas, Form, Container,Col,Button } from "react-bootstrap";
import Image from 'react-bootstrap/Image'
import axios from "axios";
import { useState } from "react";

function EditSidebar(props) {
  
  const Readable = () => {
    return (
      <Container>
        <Col>{props.name}</Col>
        <Col>
        <Image rounded="true" src={props.url}/>
        </Col>
        <Col>
        {props.desc}
        </Col>
      
        </Container>
    )
  }
  const Editable = () => { 
    const handleUpdate = () => {
      axios.post('/markers/update', {id: formState.id, name:formState.name, desc:formState.desc})
      .then(res => {
        props.handleClose()
      })
    }

    //TODO: Check if post changed from initial state, prompt if no changes.
    const [formState,setFormState] = useState({
      id: props.id,
      name: props.name,
      desc:props.desc,
      feedback: ''
    })

    const handleChange = (e) => {
      e.preventDefault();
      const { id, value } = e.target;
      setFormState((prevState) => ({
        ...prevState,
        [id]: value,
      }));
      // console.log("formstate is",formState);
    };
    return ( 
    <Form>
    <Image rounded="true" src={props.url}/>
    <Form.Group className="mb-3" controlId="name">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder={props.name} onChange={handleChange}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="desc">
      <Form.Label>Description</Form.Label>
      <Form.Control as="textarea" rows="3" placeholder={props.desc} onChange={handleChange}/>
    </Form.Group>
    <Button variant="dark" type="button" onClick={handleUpdate}>
    Update
  </Button>
  </Form>)}
  
  return (
    <>
    
      <Offcanvas show={props.show} onHide={props.handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Memory Display</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
         {props.owner === props.user && props.owner !== undefined ?  <Editable /> : <Readable />}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}


export default EditSidebar;
