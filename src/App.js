
import React from 'react'
import AppMap from './components/AppMap';
import TopBar from './components/TopBar';
import Panel from './components/Panel';
import './App.css';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      active: null,
      name: ''
    }
  }
 
  updateActive (t){
    this.setState(t)
 
  }
  render () {
  return (
    <div className="App">
      <TopBar />
      <AppMap active = {this.state.active} updateActive= {this.updateActive.bind(this)}/>
      <Panel active = {this.state.active} placeName={this.state.name}/>
    <footer>A WIP by Tim Peddle</footer>
    </div>
  );
}
}
export default App;
