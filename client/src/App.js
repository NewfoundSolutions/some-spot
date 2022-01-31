import React from "react";
import axios from "axios";
import AppMap from "./components/AppMap";
import TopBar from "./components/TopBar";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "",
      name: "",
      token: "",
      loggedIn: null,
      email: "",
      error: "",
      shouldRerender: 'false'
    };
  }
  componentDidMount() {
  if (this.state.loggedIn === null || this.state.email === "") {
      axios
        .get("/users/checkToken")
        .then((res) => {
          res.data.email
            ? this.setState({ loggedIn: true, email: res.data.email })
            : this.setState({ loggedIn: false, email: "" });
        })
        .catch((err) => console.log(err));
    }
  }

  newMarkerPosted(newMarkerID){

    this.setState({shouldRerender: newMarkerID})
  }
  updateActive(t) {
    this.setState(t);
    //todo: Sanity checking
  }
  render() {
    return (
      <div className="App">
        <TopBar
          loggedIn={this.state.loggedIn}
          email={this.state.email}
          updateActive={this.updateActive.bind(this)}
          newMarker={this.newMarkerPosted.bind(this)}
        />
        <AppMap
          shouldRerender={this.state.shouldRerender}
          user={this.state.email}
          active={this.state.active}
          updateActive={this.updateActive.bind(this)}
        />
      </div>
    );
  }
}
export default App;
