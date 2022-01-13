import React from "react";
import { Icon } from "@iconify/react";

const markerStyles = {
  position: "absolute",
  transform: "translate(-50%, -50%)",
};

const Marker = (props) => {
  const toggle = (v) => {
    props.toggleSidebar(v);
  };

  const handleClick = (e) => {
    console.log("target is", e.currentTarget);
    toggle(!props.barOpen);
    const splitURL = e.currentTarget.getAttribute("url").split('/')
    splitURL.splice(6,0,'c_crop,h_200,w_200,c_fill')
  const url = splitURL.join('/')
  console.log("url is",url)
    props.activeMarker({
      active: e.currentTarget.getAttribute("dbid"),
      desc: e.currentTarget.getAttribute("desc"),
      url: url,
      name: e.currentTarget.getAttribute("name"),
    });
    // console.log(e.currentTarget.getAttribute("name"));
  };

  return (
    <div
      className="location-marker"
      style={markerStyles}
      name={props.name} 
      key={props._id}
      dbid={props.dbid}
      lat={props.lat}
      lng={props.lng}
      desc={props.desc}
      url={props.url}
      active={props.active}
      onClick={handleClick}
    >
      <Icon icon="bx:bxs-map-pin" className="location-icon" />
    </div>
  );
};

export default Marker;
