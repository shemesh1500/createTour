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
    console.log("WITH GOOGLE", props.places),
    <GoogleMap 
      key={props.key}
      defaultCenter={props.defaultCenter}
      defaultZoom={props.defaultZoom}
    >
      {props.places.map((marker, index) => {
        const position = {lat: marker.location.lat, lng: marker.location.lng};
        return <Marker key={index} position={position}/>;
      })}
      {props.places.length > 2 && <MapDirectionsRenderer places={props.places} travelMode={window.google.maps.TravelMode.DRIVING} />}
    </GoogleMap>
  ))
);

const AppMap = props => {
  const {places} = props;
  const {
    loadingElement,
    containerElement,
    mapElement,
    defaultCenter,
    defaultZoom
  } = props;
  let cast_place = []
  console.log("MAPCOMPONENT", places, cast_place)
  useEffect(() => {
    places.sort((a,b) => a.order > b.order)
    places.map(stop => cast_place = [...cast_place, { location: stop.stop_location, order: stop.order }] ) 
  })
  const calcId =() => {
    let id = 1
    places.map(stop => id += id * (stop.lat/10))
    return id
  }
  return (
    <Map
      //key={calcId()}
      googleMapURL={
        'https://maps.googleapis.com/maps/api/js?key=' +
        'AIzaSyBVQvaXJjGPf8vsfUG9NT_VdcBWNLbiGAg' +
        '&v=3.exp&libraries=geometry,drawing,places'
      }
      places={places}
      loadingElement={loadingElement || <div style={{height: `100%`}}/>}
      containerElement={containerElement || <div style={{height: "80vh"}}/>}
      mapElement={mapElement || <div style={{height: `100%`}}/>}
      defaultCenter={defaultCenter || {lat: 25.798939, lng: -80.291409}}
      defaultZoom={defaultZoom || 1}
    />
  );
};

export default AppMap;