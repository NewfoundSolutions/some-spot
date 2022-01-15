import React from "react";
import { Button } from "react-bootstrap";
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
    formData.append("owner", this.props.loggedIn)

    const image = this.state.selectedFile;
    new Compressor(image, {
      quality: 0.6,
      success(result) {
        formData.append("files", result, result.name);
        axios
          .post("/markers/upload-pic", formData)
          .then((res) => {
            // redirect to memory page
          })
          .catch((err) => console.log(err));
      },
      error(err) {
        console.log(err.message);
      },
    });
    this.props.setUploadDone(true)
  };
   geoLocSuccess = (pos) => {
    this.setState({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    console.log(this.state)
  };
  render() {
    return (
      <div>
        <h1>Map your Memories!</h1>
        <form id="form">
          <div className="input-group">
            <label htmlFor="name">Name </label>
            <input
              name="name"
              id="name"
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
              placeholder="Name the Spot"
            />
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              placeholder="Describe the spot, your memories or anything else you would like to tag this pin with."
              onChange={(e) => {
                this.setState({ desc: e.target.value });
                console.log("this.state is:", this.state);
              }}
            ></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="files">Select files</label>
          </div>
          <input id="files" type="file" onChange={this.onFileChange} />
          
      <Button
        onClick={() => {
          return navigator.geolocation
            ? navigator.geolocation.getCurrentPosition(this.geoLocSuccess)
            : { lat: 0, long: 0 };
        }}
      >
        Use Device GPS
      </Button>
          <button type="button" onClick={this.onFileUpload}>
            Upload!
          </button>
        </form>
        <br />
      </div>
    );
  }
}

export default Uploader;
