import React from 'react'
const placeholder = 'This is very much a work in progress, once done pins will represent images or stories users have uploaded with the option to have both private and public pins.';

const Panel = (props) => {
    const fakeBlurb =`Visit scenic ${props.placeName} which, like the rest of us must be here for SOME reason`;
    return (
        <>
        <div className='mb-3'>
         {props.active ? fakeBlurb : placeholder }
            
         </div>
        </>
    )
}
Panel.defaultProps = {
    active: true,
    placeName: 'Newfoundland' 

}
export default Panel
