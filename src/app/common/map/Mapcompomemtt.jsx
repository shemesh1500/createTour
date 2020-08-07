import React, { useEffect } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { MapDirectionsRenderer } from "./MapDirectionsRenderer";

const mapStyle = [
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        saturation: 36,
      },
      {
        color: "#333333",
      },
      {
        lightness: 40,
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#ffffff",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#fefefe",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#fefefe",
      },
      {
        lightness: 17,
      },
      {
        weight: 1.2,
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#edebe4",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
      {
        lightness: 21,
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#dedede",
      },
      {
        lightness: 21,
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#d1ecc7",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        lightness: 29,
      },
      {
        weight: 0.2,
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        lightness: 18,
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#f2f2f2",
      },
      {
        lightness: 19,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#bddddd",
      },
      {
        lightness: 17,
      },
    ],
  },
];

const Map = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultOptions={{
        styles: mapStyle,
      }}
      key={props.key}
      defaultCenter={props.defaultCenter}
      zoom={props.defaultZoom}
      onClick={props.onClick}
      zoom={props.places.length === 1 ? 15 : props.defaultZoom}
      center={
        props.places.length === 1
          ? {
              lat: props.places[0].location.latitude,
              lng: props.places[0].location.longitude,
            }
          : props.defaultZoom
      }
    >
      {props.places.map((marker, index) => {
        if (marker.location) {
          const position = {
            lat: marker.location.latitude,
            lng: marker.location.longitude,
            strokeColor: marker.color ? marker.color : "red",
          };
          return <Marker key={index} position={position} />;
        }
      })}
      {props.clickLocation && (
        <Marker
          position={props.clickLocation}
          draggable={true}
          icon={"http://maps.google.com/mapfiles/ms/icons/orange.png"}
          style={{ strokeColor: "green" }}
        >
          {" "}
          <InfoWindow>
            <div style={{ color: "black" }}>
              Save for changing to this location
            </div>
          </InfoWindow>
        </Marker>
      )}
      {props.businessPlaces &&
        props.businessPlaces.map((marker, index) => {
          const position = {
            lat: marker.stop_location.latitude,
            lng: marker.stop_location.longitude,
          };
          return (
            <Marker
              key={index * 100}
              position={position}
              icon={"http://maps.google.com/mapfiles/ms/icons/green.png"}
              onClick={() => props.setSelectedBusiness(marker)}
            />
          );
        })}
      {props.places.length >= 2 && (
        <MapDirectionsRenderer
          places={props.places}
          travelMode={window.google.maps.TravelMode.WALKING}
          setDistance={props.setDistance}
          setDuration={props.setDuration}
        />
      )}
    </GoogleMap>
  ))
);

const AppMap = (props) => {
  const {
    places,
    businessPlaces,
    setSelectedBusiness,
    setDistance,
    setDuration,
    clickLocation,
    setClickLocation,
  } = props;
  let {
    loadingElement,
    containerElement,
    mapElement,
    defaultCenter,
    defaultZoom,
  } = props;
  let cast_place = [];
  useEffect(() => {
    places.sort((a, b) => a.order > b.order);
    places.map(
      (stop) => (
        (cast_place = [
          ...cast_place,
          { location: stop.stop_location, order: stop.order },
        ]),
        (defaultCenter = stop.location),
        (defaultZoom = 12)
      )
    );
  }, [props]);
  const calcId = () => {
    let id = 1;
    places.map((stop) => (id += id * (stop.lat / 10)));
    return id;
  };
  const onClick = (t, map, coord) => {
    const { latLng } = t;
    const latitude = latLng.lat();
    const longitude = latLng.lng();
    setClickLocation({ lat: latitude, lng: longitude });
  };
  return (
    <Map
      key={calcId()}
      googleMapURL={
        "https://maps.googleapis.com/maps/api/js?key=" +
        "AIzaSyBVQvaXJjGPf8vsfUG9NT_VdcBWNLbiGAg" +
        "&v=3.exp&libraries=geometry,drawing,places"
      }
      places={places}
      loadingElement={loadingElement || <div style={{ height: `100%` }} />}
      containerElement={containerElement || <div style={{ height: "100%" }} />}
      mapElement={mapElement || <div style={{ height: `100%` }} />}
      defaultCenter={defaultCenter || { lat: 32.0654326, lng: 34.7766433 }}
      defaultZoom={defaultZoom || 8}
      businessPlaces={businessPlaces}
      setSelectedBusiness={setSelectedBusiness}
      setDistance={setDistance}
      setDuration={setDuration}
      onClick={onClick}
      clickLocation={clickLocation}
    />
  );
};

export default AppMap;
