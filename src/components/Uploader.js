import React from "react";
import axios from "axios";


class Uploader extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedFile: {},
    };
  }
  

  onFileChange = async(event) => {

    const targetImage = Array(event.target.files[0]);
    this.setState({ selectedFile: targetImage[0] });
    console.log(this.state.selectedFile);
   
    
  };

  onFileUpload = () => {
    const formData = new FormData();
    formData.append("file",
      this.state.selectedFile
    );

    console.log(formData);

    axios
      .post("http://localhost:3001/markers/upload-pic", formData)
      .then((res) => console.log("response recieved"))
      .catch((err) => console.log(err));
  };

  render() {
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
