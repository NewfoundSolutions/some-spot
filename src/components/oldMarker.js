import React from "react";
import { Icon } from "@iconify/react";

const markerStyles = {
  position: "absolute",
  transform: "translate(-50%, -50%)",
};

const Marker = (props) => {
  return (
    <div className="location-marker">
      <Icon
        icon="bx:bxs-map-pin"
        className="location-icon"
        style={markerStyles}
        name={props.name}
        onClick={(e) => console.log(e)}
        key={props.key}
        lat={props.lat}
        lng={props.lng}
      />
    </div>
  );
};

export default Marker;
