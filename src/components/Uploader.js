import React from "react";
import axios from "axios";

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: {},
      name: "",
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onFileChange = (event) => {
    const targetImage = Array(event.target.files[0]);
    this.setState({ selectedFile: targetImage[0] });
  };

  onFileUpload = async () => {
    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("files", this.state.selectedFile);
    axios
      .post("http://192.168.0.14:3001/markers/upload-pic", formData)
      .then((res) => console.log("response recieved:" + res))
      .catch((err) => console.log(err));
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
