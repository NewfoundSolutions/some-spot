import React from "react";
import { Button } from "react-bootstrap";

const PinDrop = () => {
  const success = (pos) => {
    const pin = { lat: pos.coords.latitude, long: pos.coords.longitude };
    console.log(pin);
  };

  return (
    <>
      <p>Or skip the pictures all together, and use your current location</p>
      <Button
        onClick={() => {
          return navigator.geolocation
            ? navigator.geolocation.getCurrentPosition(success)
            : { lat: 0, long: 0 };
        }}
      >
        Make a Memory Here!
      </Button>
    </>
  );
};

export default PinDrop;
