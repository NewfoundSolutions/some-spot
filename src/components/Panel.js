import React from 'react'

const placeholder = 'A description of the location chosen goes here, prior to that it contains a blurb about the project.';

const Panel = (props) => {
    return (
        <div>
         {props.active ? props.placeName : placeholder }
        
           
        </div>
    )
}
Panel.defaultProps = {
    active: true,
    placeName: 'Newfoundland' 

}
export default Panel
