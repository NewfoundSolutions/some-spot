import React from "react";
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
      long: 0,
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onFileChange = async (event) => {
    const targetImage = Array(event.target.files[0]);
    let exy = await exifr.gps(targetImage[0]);
    exy === undefined
      ? console.log("no gps info in image")
      : this.setState({ lat: exy.latitude, long: exy.longitude });
    this.setState({ selectedFile: targetImage[0] });
  };

  onFileUpload = () => {
    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("lat", this.state.lat);
    formData.append("long", this.state.long);

    const image = this.state.selectedFile;
    new Compressor(image, {
      quality: 0.6,
      success(result) {
        formData.append("files", result, result.name);
        console.log("result is", result);
        axios
          .post("http://192.168.0.14:3001/markers/upload-pic", formData)
          .then((res) => console.log("response recieved:" + res))
          .catch((err) => console.log(err));
      },
      error(err) {
        console.log(err.message);
      },
    });
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
              onChange={this.onNameChange}
              placeholder="Name the Spot"
            />
          </div>
          <div className="input-group">
            <label htmlFor="files">Select files</label>
          </div>
          <input id="files" type="file" onChange={this.onFileChange} />
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
