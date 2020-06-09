import React, { useEffect } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import  {MapDirectionsRenderer} from './MapDirectionsRenderer';

const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap 
      key={props.key}
      defaultCenter={props.defaultCenter}
      defaultZoom={props.defaultZoom}
    >
      { props.places.map((marker, index) => {
        const position = {lat: marker.location.lat, lng: marker.location.lng};
        return <Marker key={index} position={position}/>;
      })}
      { props.places.length >= 2 && <MapDirectionsRenderer places={props.places} travelMode={window.google.maps.TravelMode.DRIVING} />}
    </GoogleMap>
  ))
);

const AppMap = props => {
  const {places} = props;
  let {
    loadingElement,
    containerElement,
    mapElement,
    defaultCenter,
    defaultZoom
  } = props;
  let cast_place = []
  console.log("MAPCOMPONENT", props)
  useEffect(() => {
    console.log("places", places)
    places.sort((a,b) => a.order > b.order)
    places.map(stop => (cast_place = [...cast_place, { location: stop.stop_location, order: stop.order }], defaultCenter= stop.location , defaultZoom= 12) ) 
    console.log("default values", defaultCenter,defaultZoom)
  }, [props])
  const calcId =() => {
    let id = 1
    places.map(stop => id += id * (stop.lat/10))
    return id
  }
  console.log("center & zoom", defaultCenter, defaultZoom)
  return (
    <Map
      key={calcId()}
      googleMapURL={
        'https://maps.googleapis.com/maps/api/js?key=' +
        'AIzaSyBVQvaXJjGPf8vsfUG9NT_VdcBWNLbiGAg' +
        '&v=3.exp&libraries=geometry,drawing,places'
      }
      places={places}
      loadingElement={loadingElement || <div style={{height: `100%`}}/>}
      containerElement={containerElement || <div style={{height: "80vh"}}/>}
      mapElement={mapElement || <div style={{height: `100%`}}/>}
      defaultCenter={defaultCenter || {lat: 32.0654326, lng: 34.7766433}}
      defaultZoom={defaultZoom || 8}
    />
  );
};

export default AppMap;