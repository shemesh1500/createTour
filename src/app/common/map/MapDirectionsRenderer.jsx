/*global google*/
import React, { useState, useEffect } from "react";
import { DirectionsRenderer } from 'react-google-maps'

export function MapDirectionsRenderer(props) {
    const [directions, setDirections] = useState(null);
    const [error, setError] = useState(null);
    let delayFactor = 0;
    useEffect(() => {
        const { places, travelMode } = props;
        places.sort((a, b) => a.order > b.order)
        const waypoints = places.map(p => ({
            location: { lat: p.location.lat, lng: p.location.lng },
            stopover: true
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
                    waypoints: waypoints
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
                    console.log("MapDirectionsRenderer", waypoints, travelMode, status)
                }
            );
        //}
    });

    if (error) {
        return (<h1>{error}</h1>);
    }
    return (
        directions && (
            <DirectionsRenderer directions={directions} />
        )
    );
}