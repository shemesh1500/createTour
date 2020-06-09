/*global google*/
import React, { useState, useEffect } from 'react'
import { Grid } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createTour, updateTour } from '../tourAction'
import TourMainNav from './TourMainNav';
import MapComponent from '../../../app/common/map/MapComponent';
import PeakMainLocation from './PeakMainLocation';
import TourForm from './TourForm';
import TourMedia from './TourMedia';
import CreateRoute from './CreateRoute';
import { compose } from 'redux';
import Mapcomponent from '../../../app/common/map/Mapcompomemtt'
import '../../../style/tourControl.css'
import { toastr } from 'react-redux-toastr';
import TourDetails from './TourDetails';

const query = (props) => {

    let tourId;
    if (props.tourId) {
        tourId = props.tourId
    }
    else if (props.initialValues && props.initialValues.tourId) {
        tourId = props.initialValues.tourId
    }
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
    updateTour
}

const mapState = (state, ownProps) => {
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
            stops.sort((a, b) => a.order > b.order)
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
    const [mapZoom, setZoom] = useState( 0)
    const [all_stops, setAllStops] = useState([]);
    let all_stop = initialValues.all_stops ? initialValues.all_stops : []
    let bounds;


    const handleMainNavClick = (value) => {
        if(tourId){
            setMainNav(value)
        }
        else{
            toastr.error('Enter tour name', 'Please enter your tour name')
        }
    }

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
        const { firestore, } = props
        if (tourId) {
            setListener(firestore, { collection: 'tours', doc: tourId, subcollections: [{ collection: 'stops' }] })

        }

        return () => {
            unSetListener(firestore, { collection: 'tours', doc: tourId, subcollections: [{ collection: 'stops' }] })
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
            all_stops.sort((a, b) => a.order > b.order)
            setMarkerList(all_stops);


            //  getAllPoints();
        }
        if (all_stop.length !== 0) {
            console.log("all_stop", props.stop)
            setCenter(all_stops[0].stop.stop_location)
            setZoom(7)
        }


    }, [props, initialValues]);


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
                props.history.push(`/tourControl/${tour.id}`)
                // setMarkerList({ location: values.main_location , order: 100 })
                props.change('id', tour.id)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onFormSubmit = async values => {
        console.log("values on save", values);
        
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
                return (
                    <PeakMainLocation
                        saveChanges={onPeakAddSubmit}
                        setZoom={setZoom}
                        setCenter={setCenter}
                        setSelectMarker={setClickMarker}
                    />
                );
            case 'Tour Editor':
                return <TourDetails onFormSubmit={onFormSubmit} />
            case 'Create Route':
                if (tourId) {
                    return <CreateRoute
                        setMarker={setClickMarker}
                        setCenter={setCenter}
                        markerList={markerList}
                        setMarkerList={setMarkerList}
                        //all_stops={all_stops} 
                        defaultCenter={mapCenter}
                        defaultZoom={mapZoom}
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
        }

    }
    return (
        <div className='controlArea'>
            <div className='contextArea'>
                <TourMainNav activeTab={mainNavActive} handleTabChange={handleMainNavClick} />
                {renderMainNav()}
            </div>
            <div className='mapArea'>
                {renderMainWorkZone()}
            </div>
        </div>
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