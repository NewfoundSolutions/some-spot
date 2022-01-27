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
      updatedLast: ''
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
  updateActive(t) {
    this.setState(t);
    //todo: Sanity checking
  }
  mapUpdated (id) { 
    this.setState( (prevState) =>
      ({...prevState, updatedLast: id}))
  }
  render() {
    return (
      <div className="App">
        <TopBar
          mapUpdated={this.mapUpdated.bind(this)}
          loggedIn={this.state.loggedIn}
          email={this.state.email}
          updateActive={this.updateActive.bind(this)}
        />
        <AppMap
          updatedLast={this.state.updatedLast}
          mapUpdated={this.mapUpdated.bind(this)}
          user={this.state.email}
          active={this.state.active}
          updateActive={this.updateActive.bind(this)}
        />
      </div>
    );
  }
}
export default App;
