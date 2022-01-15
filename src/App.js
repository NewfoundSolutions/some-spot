import React from "react";
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
      loggedIn: ""

    };
  }
  componentDidMount () {
    
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
          active={this.state.active}
          updateActive={this.updateActive.bind(this)}
        />
      </div>
    );
  }
}
export default App;
