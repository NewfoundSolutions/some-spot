import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import { mapKey } from '../config/keys.js';

//{name: 'Signal Hill', lat: '47.5697', lng:'-52.6819' },
const tempLocations = [
{name: 'Argentia',	lat: '47.30043194', lng:'-53.98999679'},
{name: 'Buchans', lat: '48.81703188',	lng:'-56.86659123'},
{name: 'Cartwright',	lat: '53.70140663',	lng:'-57.01214114'},
{name: 'Channel Port Aux Basques',	lat: '47.56700482',	lng:'-59.15004358'},
{name: 'Churchill Falls',	lat: '53.52640851',	lng:'-63.98067896'},
{name: 'Corner Brook',	lat: '48.94999534',	lng:'-57.93334782'},
{name: 'Deer Lake',	lat: '49.17440025',	lng:'-57.42691878'},
{name: 'Forteau',	lat: '51.45038535',	lng:'-56.94999699'},
{name: 'Gander',	lat: '48.94999534',	lng:'-54.54998845'},
{name: 'Happy Valley Goose Bay',	lat: '53.29998822',	lng:'-60.29999923'},
{name: 'Hopedale',	lat: '55.44996035',	lng:'-60.21667098'},
{name: 'La Scie',	lat: '49.96701337',	lng:'-55.58300033'},
{name: 'Labrador City',	lat: '52.94143129',	lng:'-66.91587447'},
{name: 'Nain',	lat: '56.54735147',	lng:'-61.6860454'},
{name: 'Port Burwell',	lat: '60.26646222',	lng:'-64.74109766'},
{name: 'Port Hope Simpson',	lat: '52.53329083',	lng:'-56.30001083'},
{name: 'Rigolet',	lat: '54.17660138',	lng:'-58.44732162'},
{name: 'St. Anthony',	lat: '51.3837486',	lng:'-55.5999502'},
{name: 'St. John’s',	lat: '47.58498822',	lng:'-52.68100692'},
{name: 'Stephenville',	lat: '48.55040733',	lng:'-58.56656498'},
{name: 'Trepassey',	lat: '46.73697797',	lng:'-53.36329085'},
{name: 'Trout River',	lat: '49.48365786',	lng:'-58.11664413'}
]


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