import React from "react";
import axios from "axios";

class Uploader extends React.Component {
  state = {
    selectedFile: null,
    latitude: null,
    longitude: null
  };

  onFileChange = async (event) => {
    this.setState({ selectedFile: event.target.files[0]});
    console.log(this.state.selectedFile);
  };
  
  onFileUpload = () => {
    const formData = new FormData();

    formData.append(
      "name",
      "test#1"
    );
    
    formData.append(
      "coords",
      {lat: this.state.latitude,	lng:this.state.longitude}
    );
    
    formData.append(
      "content",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    console.log(formData);

    axios.post("markers/upload-pic", formData);
  };

  render() {
    // console.log(this.state.selectedFile);
    return (
      <div>
        <h1>Map your Memories!</h1>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>Upload!</button>
          <br />
        </div>
      </div>
    );
  }
}

export default Uploader;
