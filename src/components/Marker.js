import React from "react";
import { Icon } from "@iconify/react";

const markerStyles = {
  position: "absolute",
  transform: "translate(-50%, -50%)",
};

class Marker extends React.Component {
  handleClick(e) {
    console.log("target is",e.currentTarget)
    this.props.updateParent({
      active: e.currentTarget.getAttribute("dbId"),
      name: e.currentTarget.getAttribute("name"),
    });
    console.log(e.currentTarget.getAttribute("name"));
  }

  render() {
    return (
      <div
        className="location-marker"
        style={markerStyles}
        name={this.props.name}
        key={this.props.key}
        dbId={this.props.dbId}
        lat={this.props.lat}
        lng={this.props.lng}
        active={this.props.active}
        onClick={this.handleClick.bind(this)}
      >
        <Icon icon="bx:bxs-map-pin" className="location-icon" />
      </div>
    );
  }
}
export default Marker;
