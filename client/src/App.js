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
    };
  }
  componentDidMount() {
  if (this.state.loggedIn === null) {
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
  updateActive(t) {
    this.setState(t);
    //todo: Sanity checking
  }
  render() {
    return (
      <div className="App">
        <TopBar
          loggedIn={this.state.loggedIn}
          updateActive={this.updateActive.bind(this)}
        />
        <AppMap
          user={this.state.email}
          active={this.state.active}
          updateActive={this.updateActive.bind(this)}
        />
      </div>
    );
  }
}
export default App;
