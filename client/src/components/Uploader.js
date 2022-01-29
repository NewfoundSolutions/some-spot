import React from "react";
import { Button, Form, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import exifr from "exifr";
import Compressor from "compressorjs";

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: {},
      name: "",
      lat: 0,
      lng: 0,
      desc: "",
    };
  }

  onFileChange = async (event) => {
    const targetImage = Array(event.target.files[0]);
    let exy = await exifr.gps(targetImage[0]);
    exy === undefined
      ? console.log("no gps info in image")
      : this.setState({ lat: exy.latitude, lng: exy.longitude });
    this.setState({ selectedFile: targetImage[0] });
  };

  onFileUpload = async () => {
    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("lat", this.state.lat);
    formData.append("lng", this.state.lng);
    formData.append("desc", this.state.desc);
    formData.append("owner", this.props.email);

    const image = this.state.selectedFile;
    new Compressor(image, {
      quality: 0.6,
      success(result) {
        formData.append("files", result, result.name);
        axios
          .post("/markers/upload-pic", formData)
          .catch((err) => console.log(err));
      },
      error(err) {
        console.log(err.message);
      },
    });
    this.props.setUploadDone(true);
  };
  geoLocSuccess = (pos) => {
    this.setState({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    console.log(this.state);
  };
  render() {
    return (
      <>
      <h3>Create a New Spot!</h3>
        <Form >
          <Form.Group className="mb-3" id="form">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              id="name"
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
              placeholder="Name the Spot"
            />
            <Form.Text className="text-muted">
              You can save the story for below, if there's one to tell.
            </Form.Text>
          </Form.Group>

          <InputGroup> 
          <InputGroup.Text>Description</InputGroup.Text>
            <FormControl
              as="textarea"
              aria-label="Description"
              rows='4'
              placeholder="Describe the spot, your memories or anything else you would like to tag this pin with."
              onChange={(e) => {
                this.setState({ desc: e.target.value });
              }}
            />
          </InputGroup>

          <Form.Group  className="mb-3">
    <Form.Label>Select an image with embedded GPS data, or use your devices location!</Form.Label>
    <Form.Control id="files" type="file" onChange={this.onFileChange}  size="sm" encType="multipart/form-data"/>
  </Form.Group>
              <div style={{display:'flex'}} >

          <Button variant = "dark" style={{margin:'auto'}}
            onClick={() => {
              return navigator.geolocation
              ? navigator.geolocation.getCurrentPosition(this.geoLocSuccess)
              : { lat: 0, long: 0 };
            }}
            >
            Use Device GPS
          </Button>

          <Button variant="dark" style={{margin:'auto'}}onClick={this.onFileUpload} type="submit">
            Upload!
          </Button>
            </div>
        </Form>

        
      </>
    );
  }
}

export default Uploader;
