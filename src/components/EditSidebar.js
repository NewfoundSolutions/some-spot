import { React} from "react";
import { Offcanvas, Form, Container,Col } from "react-bootstrap";
import Image from 'react-bootstrap/Image'

function EditSidebar(props) {
  const handleUpdate = () => {}
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
    return ( 
    <Form>
    <Image rounded="true" src={props.url}/>
    <Form.Group className="mb-3" controlId="formGroupName">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder={props.name} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formGroupDesc">
      <Form.Label>Description</Form.Label>
      <Form.Control as="textarea" rows="3" placeholder={props.desc}/>
    </Form.Group>
    <button type="button" onClick={handleUpdate}>
    Update
  </button>
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
