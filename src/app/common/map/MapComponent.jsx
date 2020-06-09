/*global google*/
import React, { useEffect, useState } from 'react'
import { Icon } from 'semantic-ui-react'
import GoogleMapReact from 'google-map-react'
import { DirectionsRenderer, GoogleMap, Marker } from 'react-google-maps'


const MapComponent = (props) => {
  //markerList includes : {lat, lng, color}
  let { selectedMarker, markerList, zoom, center, handleClickMap, setCenter,  travelMode } = props
  let delayFactor = 0
  //console.log("all markers", markerList)
  // let bounds
  /* useEffect(() => {
       bounds = new google.maps.LatLngBounds();
       for (var i = 0; i < markerList.length; i++) {
           console.log("point", markerList[i])
           bounds.extend(markerList[i]);
       }
       console.log("after loop map", markerList.length, bounds)
       setCenter(bounds.getCenter())
   }, [markerList])
*/

  function MapDirectionsRenderer(props) {

    const [directions, setDirections] = useState(null);
    const [error, setError] = useState(null);
    //useEffect(() => {
    const { places, travelMode } = props;

    const waypoints = places.map(p => ({
      location: { lat: p.location.lat, lng: p.location.lng },
      stopover: true
    }));
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;
    console.log("waypoints", waypoints, origin, destination)
    const directionsService = new google.maps.DirectionsService();
    const getRoute = () => {
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: travelMode,
          waypoints: waypoints
        },
        (result, status) => {
          console.log("status", status, result)
          if (status === google.maps.DirectionsStatus.OK) {
            //console.log("route", result)
            setDirections(result);
          } else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
            delayFactor++;
            setTimeout(function () {
              // getMapBounds()
            }, delayFactor * 1000);

          } else {
            setError(result);
          }
        }
      );
    }
    getRoute()
    //});
    console.log("diractions", directions)
    if (error) {
      return <h1>{error}</h1>;
    }
    return (
      directions && (
        <DirectionsRenderer directions={directions} />
      )
    );
  }
    
  const mapStyle =[
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#333333"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#edebe4"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dedede"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#d1ecc7"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#bddddd"
            },
            {
                "lightness": 17
            }
        ]
    }
]
      const mapOptions = {
        styles: mapStyle // straight out of something like snazzymaps
    };
  //let bounds 
  const getMapBounds = (map, maps, locations) => {
    let bounds = new maps.LatLngBounds();
    // console.log("location", locations)
    if (locations.length === 0) {
      bounds.extend(
        new maps.LatLng(-15, 15),
      );
      bounds.extend(
        new maps.LatLng(-20, 20),
      );
    }
    locations.forEach((location) => {
      console.log("location", location)
      bounds.extend(
        new maps.LatLng(location.location.lat, location.location.lng),
      );
    });
    return bounds;
  };

  const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, 'idle', () => {
      maps.event.addDomListener(window, 'resize', () => {
        map.fitBounds(bounds);
      });
    });
  };

  const apiIsLoaded = (map, maps, locations) => {
    //   console.log("locations", locations)
    if (map) {
      const bounds = getMapBounds(map, maps, locations);
      //     console.log("bouns", bounds)
      map.fitBounds(bounds);

      bindResizeListener(map, maps, bounds);
    }
  };
  const Marker = ({ children }) => children;

  return (
    <div style={{ height: '600px', width: '100%' }} >
      <GoogleMapReact
        key={markerList.length}
        bootstrapURLKeys={{ key: 'AIzaSyBVQvaXJjGPf8vsfUG9NT_VdcBWNLbiGAg' }}
        initialCenter={center}
        center={center}
        defaultZoom={zoom}
        zoom={zoom}
        onClick={handleClickMap}
        //bounds={bounds}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, markerList)}
        options={mapOptions}
      >
        {markerList.map(marker => (
          console.log("marker", marker),
          <Marker key={marker.location.lat + marker.location.lng} lat={marker.location.lat} lng={marker.location.lng}>
            <Icon name='marker' color='red' />
          </Marker>
        ))}
        {markerList.length > 10 && <MapDirectionsRenderer places={markerList} travelMode={travelMode} />}
      </GoogleMapReact>

    </div>
  )
}

export default MapComponent
