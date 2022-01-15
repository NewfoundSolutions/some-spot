import { React} from "react";
import { Offcanvas, Form } from "react-bootstrap";
import Image from 'react-bootstrap/Image'

function Sidebar(props) {
  const handleUpdate = () => {}

  return (
    <>
    
      <Offcanvas show={props.show} onHide={props.handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Memory Display</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
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
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
