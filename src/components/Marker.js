import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Icon } from "@iconify/react";
import { Popover } from "react-bootstrap";

const markerStyles = {
  position: "absolute",
  transform: "translate(-50%, -50%)",
};

class Marker extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  Overlay = () => {
    const popover = (
      <Popover id="popover-positioned-bottom">
        <div>{this.props.name}</div>
      </Popover>
    );
    return popover;
  };
  handleClick = (e) => {
    console.log("target is", e.currentTarget);
    this.props.updateParent({
      active: e.currentTarget.getAttribute("dbid"),
      name: e.currentTarget.getAttribute("name"),
    });
    // console.log(e.currentTarget.getAttribute("name"));
  };
  render() {
    return (
      <OverlayTrigger trigger="click" placement="bottom" overlay={this.Overlay}>
        <div
          ref={this.ref}
          className="location-marker"
          style={markerStyles}
          name={this.props.name}
          key={this.props._id}
          dbid={this.props.dbid}
          lat={this.props.lat}
          lng={this.props.lng}
          active={this.props.active}
          onClick={this.handleClick}
        >
          <Icon icon="bx:bxs-map-pin" className="location-icon" />
        </div>
      </OverlayTrigger>
    );
  }
}

export default Marker;
