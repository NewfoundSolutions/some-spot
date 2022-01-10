import React from "react";
import AppMap from "./components/AppMap";
import TopBar from "./components/TopBar";
// import Panel from "./components/Panel";
import "./App.css";
import MarkerPopover from "./components/MarkerPopover";
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
        {/* <Panel active={this.state.active} placeName={this.state.name} /> */}
        <footer><MarkerPopover /></footer>
      </div>
    );
  }
}
export default App;
