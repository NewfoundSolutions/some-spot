import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import { mapKey } from '../config/keys.js';
import { tempLocations } from '../config/tempLocations.js'

//{name: 'Signal Hill', lat: '47.5697', lng:'-52.6819' }


class AppMap extends React.Component {
    updateParent(value) {
        this.props.updateActive(value);
    }
    
    render (){
    return (
        <div className="map" 
        >
        <GoogleMapReact
         bootstrapURLKeys={mapKey}
         defaultCenter= { this.props.center }
         defaultZoom= { this.props.zoom }
         
        >
            {/* TEMP Populate Map */}
            {tempLocations.map((entry,i) => 
            <Marker 
            key={i} 
            id={i} 
            name={entry.name} 
            lat={entry.lat} 
            lng={entry.lng} 
            active={(this.props.active === this.props.id).toString()} 
            updateParent={this.updateParent.bind(this)}/>)}
           
            
        </GoogleMapReact>
        
    </div>
    )
}
}
AppMap.defaultProps = {
    center: {
        lat: 48.8216,
        lng: -56.0606
    },
    zoom: 5
}
export default AppMap;