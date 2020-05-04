/*global google*/
import React, { useState, useEffect, Fragment } from 'react'
import { Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withFirestore, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createTour, updateTour } from '../tourAction'
import TourMainNav from './TourMainNav';
import MapComponent from '../../../app/common/map/MapComponent';
import PeakMainLocation from './PeakMainLocation';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import TourForm from './TourForm';
import TourMedia from './TourMedia';
import CreateRoute from './CreateRoute';
import { getAllStopsPoint } from '../../stop/stopAction';
import { compose } from 'redux';
import  Mapcomponent  from '../../../app/common/map/Mapcompomemtt'

const query = (props) => {

    let tourId;
    if (props.tourId) {
        tourId = props.tourId
    }
    else if (props.initialValues && props.initialValues.tourId) {
        tourId = props.initialValues.tourId
    }
    console.log("query", props, tourId)
    if (tourId) {
        return [
            {
                collection: 'tours',
                doc: tourId,
                subcollections: [{ collection: 'stops' }],
                storeAs: 'stops'
            },
            { collection: 'tours' }
        ]
    } else {
        return [
            { collection: 'tours' }
        ]
    }
}

const actions = {
    createTour,
    updateTour,
    getAllStopsPoint
}

const mapState = (state, ownProps, props) => {
    let tourId;
    let stops;
    if (ownProps.match.params.tourId) {
        tourId = ownProps.match.params.tourId;
    } else if (state.form.tourForm && state.form.tourForm.values.id) {
        tourId = state.form.tourForm.values.id
    }

    let tour = {}
    if (state.firestore.ordered.tours && state.firestore.ordered.tours.length > 0) {
        tour = state.firestore.ordered.tours.filter(tour => tour.id === tourId)[0] || {}
        if (state.firestore.ordered.stops) {
            stops = state.firestore.ordered.stops
            stops.sort((a,b) => a.order > b.order)
        }
    }

    return {
        stops: stops,
        initialValues: tour,
        tourId: tourId
    }
}

const TourControl = (props) => {

    const { initialValues, tourId } = props;
    const [mainNavActive, setMainNav] = useState("Main Location");
    const [markerList, setMarkerList] = useState([])
    const [clickMarker, setClickMarker] = useState(null)
    const [mapCenter, setCenter] = useState({ lat: 15.0, lng: 15.0 })
    const [mapZoom, setZoom] = useState(0)
    const { latitude, setLatitude } = useState(0);
    const { longitude, setLongitude } = useState(0);
    const [all_stops, setAllStops] = useState([]);
    let all_stop = initialValues.all_stops ? initialValues.all_stops : []
    let bounds;

    //async function getAllPoints() {
    //  props.getAllStopsPoint(tourId).then(response => {
    // console.log("getAllStopsPoint Rensponse", response)
    //    setMarkerList(response);
    //  bounds = new google.maps.LatLngBounds();
    //  console.log("before loop", response.length, response, bounds)
    //  for (var i = 0; i < response.length; i++) {
    //      console.log("point", response[i])
    //      bounds.extend(response[i]);
    //  }
    //  console.log("after loop", bounds, bounds.getCenter())
    //setCenter(bounds.getCenter())
    //})
    // }

    async function setListener(firestore, path) {
        await firestore.setListener(
            {
                collection: 'tours'
            },
            {
                collection: 'tours',
                doc: tourId,
                subcollections: [{ collection: 'stops' },]
            })
    }

    async function unSetListener(firestore, path) {
        await firestore.unsetListener(
            {
                collection: 'tours'
            },
            {
                collection: 'tours',
                doc: tourId,
                subcollections: [{ collection: 'stops' },]
            })
    }

    useEffect(() => {
        const { firestore, match } = props
        if (tourId) {
             setListener(firestore, {collection: 'tours', doc: tourId,subcollections: [{ collection: 'stops' }]   })
        }

        return () => {
             unSetListener(firestore, { collection: 'tours', doc: tourId,subcollections: [{ collection: 'stops' }] })
        }
    })


    useEffect(() => {
        if (initialValues && initialValues.main_location) {
            setCenter(initialValues.main_location);
            setZoom(17);
            setClickMarker(initialValues.main_location)
        }
        if (initialValues.all_stops) {
            console.log("setStops", all_stops)
            setAllStops(initialValues.all_stops)
        }

        if (props.stops && props.stops.length !== markerList.length) {
            let all_stops = []
            props.stops.map(stop => all_stops = [...all_stops, { location: stop.stop_location, order: stop.order }])
            all_stops.sort((a,b)=> a.order > b.order)
            setMarkerList(all_stops);
            //  getAllPoints();
        }


    }, [props, initialValues, props.currentPosition]);


    const addStopToTour = (all_stops, newStop) => {
        const updated_stops = [...all_stops, newStop]
        props.change('all_stops', updated_stops)
    }

    const onPeakAddSubmit = async (values) => {
        try {
            if (values.id) {
                this.props.updateStop(values)
            }
            else {
                let tour = await props.createTour(values)
                props.change('id', tour.id)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onFormSubmit = async values => {
        try {
            if (props.initialValues.id) {
                props.updateTour(values)
                props.handleEditStat(false)
            } else {
                let createdTour = await props.createTour(values)
                props.change('id', createdTour.id)
            }
        } catch (error) {
            console.log(error)
        }

    };

    const addMarker = (lat, lng, color, name = null) => {
        // let currentList = markerList;
        let newList = [...markerList, { lat: lat, lng: lng, color: color, name: name }]
        setMarkerList(newList)
    }

    const removeMarker = (lat, lng, color, name) => {
        if (name) {
            let newList = markerList.filter(marker =>
                marker.name.includes(name) !== true
            )
            setMarkerList(markerList.filter(marker => marker.name.includes(name) !== true))

        } else {
            let newList = markerList.filter(marker =>
                marker.lat !== lat &&
                marker.lng !== lng &&
                marker.color !== color)
            setMarkerList(newList)
        }
    }

    const handleClickMap = (e) => {
        if (mainNavActive === 'Main Location') {
            let location = { lat: e.lat, lng: e.lng, color: 'red' }
            setClickMarker(location)
            setCenter(location)
            // if (mapZoom < 12) {
            //     setZoom(mapZoom + 3)
            // }
            try {
                props.change('main_location', location)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const renderMainNav = () => {
        switch (mainNavActive) {
            case 'Main Location':
                //etMapClick(()=>handleClickMap() )
                return (
                    <PeakMainLocation
                        saveChanges={onPeakAddSubmit}
                        setZoom={setZoom}
                        setCenter={setCenter}
                        setSelectMarker={setClickMarker}
                    />
                );
            case 'Tour Details':
                return <TourForm onFormSubmit={onFormSubmit} />
            case 'Tour Media':
                return <TourMedia saveChanges={onFormSubmit} />
            case 'Create Route':
                if (tourId) {
                    return <CreateRoute
                        setMarker={setClickMarker}
                        setCenter={setCenter}
                        markerList={markerList}
                        setMarkerList={setMarkerList}
                        //all_stops={all_stops} 
                        tourId={tourId}
                        addStopToTour={addStopToTour} />
                } else {
                    return <h1>Please create main location please</h1>
                }
            default:
                break;

        }
    }
    const renderMainWorkZone = () => {
        // console.log("marker list", markerList)
        switch (mainNavActive) {
            case 'Tour Medi1':
                return <div>Media</div>;
            case 'Main Location1':
                return (<MapComponent
                    travelMode={google.maps.TravelMode.DRIVING}
                    selectedMarker={clickMarker}
                    markerList={markerList}
                    zoom={mapZoom}
                    bounds={bounds}
                    center={mapCenter}
                    setCenter={setCenter}
                    handleClickMap={handleClickMap}
                />)
            default: 
            return (<Mapcomponent   
                places={markerList}
            />
            )
                      
              /*  if (props.stops){
                    console.log("new places", markerList, props.stops)
                    return (<Mapcomponent   
                        places={markerList}
                    />
                    )
                }*/
         
        }

    }
    return (
        <Grid >
            <Grid.Column width={2}>
                <TourMainNav activeTab={mainNavActive} handleTabChange={setMainNav} />
            </Grid.Column>
            <Grid.Column width={5}>
                {renderMainNav()}
            </Grid.Column>
            <Grid.Column width={9}>
                {renderMainWorkZone()}
            </Grid.Column>
        </Grid>
    )
}


export default compose(
    connect(mapState, actions),
    firestoreConnect(props => query(props)),
    reduxForm(
        {
            form: 'tourForm',
            enableReinitialize: true,
            destroyOnUnmount: false,
            forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
        })
)(TourControl);

/*
export default withFirestore(
    connect(mapState, actions)
        (reduxForm(
            {
                form: 'tourForm',
                enableReinitialize: true,
                destroyOnUnmount: false,
                forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
            })
            (firestoreConnect([{ collection: 'tours' }])(TourControl))));
*/