import React from "react"
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import Marker from "./Marker.js"




class MarkerPopover extends React.Component {
  render() {
    const popover = () => (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Popover right</Popover.Title>
        <Popover.Content>
          And here's some <strong>amazing</strong> content. It's very engaging.
          right?
        </Popover.Content>
      </Popover>
    );

    const Example = () => (
      <OverlayTrigger trigger="click" placement="top" overlay={{popover}}>
        <Button variant="success">Click me to see</Button>
      </OverlayTrigger>
    );

    return (
      <Example />
    )
  }
}

export default MarkerPopover;