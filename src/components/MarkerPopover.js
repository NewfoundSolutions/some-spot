import React from "react"
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import Marker from "./Marker.js"


const Overlay = () => {
  const popover = (
    <Popover id="1">
      <div>ffs</div>
    </Popover>
  );
  return popover;
};

class MarkerPopover extends React.Component {
  render() {
    return (
      <OverlayTrigger trigger="click" placement="top" overlay={Overlay}>
        <Marker />
      </OverlayTrigger>
    );
  }
}
export default MarkerPopover;