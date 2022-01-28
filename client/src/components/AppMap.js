import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import EditSidebar from "./EditSidebar.js";

const mapKey = process.env.REACT_APP_KEY;
const mapStyle = {
  width: "100%",
  height: "100%",
  left: "0",
  top: "0",
  margin: "0",
  padding: "0",
  position: "absolute",
};

class AppMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      barOpen: false,
      name: "",
      desc: "",
      url: "",
      owner: "",
    };
  }

  updateParent(v) {
    this.props.updateActive(v);
  }
  activeMarker = (v) => {
    this.setState(v);
  };

  toggleSidebar = (v) => {
    if (this.state.barOpen !== v) {
      this.setState({
        barOpen: v,
      });
    }
  };

  fetchMarkerList(id) {
    console.log("fetching id:",id)
    if ((id === undefined) || (id === 'deleted')) {
      fetch("/markers/list")
        .then((res) => res.json())
        .then((responseJson) => {
          // console.log("responseJson is",responseJson.data[0]._id)
          this.setState(() => {
            return { markers: responseJson.data };
          });
        });
      } else {
      const markerList = this.state.markers.slice();
      fetch(`/markers/list/${id}`)
        .then((res) => res.json())
        .then((responseJson) => {
          const editedList = markerList.map(marker => marker._id === responseJson.updatedSpot._id ? responseJson.updatedSpot :  marker)
          this.setState({markers: editedList});
        });

    }
  }

  componentDidMount() {
    this.fetchMarkerList();
  }

  render() {
    return (
      <div className="map" style={mapStyle}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: mapKey }}
          yesIWantToUseGoogleMapApiInternals
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {/* Populate above map with markers */}
          {this.state.markers.map((entry) => (
            <Marker
              key={entry._id}
              dbid={entry._id}
              name={entry.name}
              lat={entry.lat}
              lng={entry.lng}
              desc={entry.desc}
              url={entry.url}
              owner={entry.owner}
              updateParent={this.updateParent.bind(this)}
              activeMarker={this.activeMarker}
              toggleSidebar={this.toggleSidebar}
              barOpen={this.state.barOpen}
            />
          ))}
        </GoogleMapReact>
        <EditSidebar
          updateMarker={this.fetchMarkerList.bind(this)}
          id={this.state.active}
          user={this.props.user}
          owner={this.state.owner}
          show={this.state.barOpen}
          name={this.state.name}
          desc={this.state.desc}
          url={this.state.url}
          handleClose={() => {
            this.setState((prevState) => ({
              barOpen: !prevState.barOpen,
            }));
          }}
        />
      </div>
    );
  }
}
AppMap.defaultProps = {
  center: {
    lat: 48.8216,
    lng: -56.0606,
  },
  zoom: 5,
};
export default AppMap;
