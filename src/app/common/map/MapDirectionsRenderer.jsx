/*global google*/
import React, { useState, useEffect } from "react";
import { DirectionsRenderer } from "react-google-maps";

export function MapDirectionsRenderer(props) {
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  let delayFactor = 0;
  console.log("test");
  useEffect(() => {
    const { places, travelMode } = props;
    places.sort((a, b) => a.order > b.order);
    const waypoints = places.map((p) => ({
      location: { lat: p.location.latitude, lng: p.location.longitude },
      stopover: true,
    }));

    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;

    const directionsService = new google.maps.DirectionsService();
    //if (directions === null) {
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: travelMode,
        waypoints: waypoints,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
          delayFactor++;
          setTimeout(function () {
            // getMapBounds()
          }, delayFactor * 1000);
        } else {
          setError(result);
        }
        if (result && result.routes[0].legs) {
          let totalDistance = 0;
          let totalDuration = 0;
          let legs = result.routes[0].legs;
          for (var i = 0; i < legs.length; ++i) {
            totalDistance += legs[i].distance.value;
            //  totalDuration += legs[i].duration.value;
          }
          for (var i = 0; i < legs.length; ++i) {
            new google.maps.Marker({
              position: legs[i].start_location,

              title: "title",
            });
          }
          props.setDistance(totalDistance);
          // props.setDuration(totalDuration);
        }
      }
    );
    //}
  }, [props.places]);

  if (error) {
    return <h1>{error}</h1>;
  }
  var rendererOptions = {
    suppressMarkers: true,
  };
  return (
    directions && (
      <DirectionsRenderer
        defaultOptions={rendererOptions}
        directions={directions}
      />
    )
  );
}
