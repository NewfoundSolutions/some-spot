import React from 'react'
import {Button} from 'react-bootstrap'

const getPosition = () => {
    navigator.geolocation ? navigator.geolocation.getCurrentPosition(success) : 
}
const success = () => {
    pos.coords.latitude;
}



const PinDrop = () => {
    return (
        <>
          <Button onClick={getPosition()}>Make a Memory Here!</Button>  
        </>
    )
}

export default PinDrop
