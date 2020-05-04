import React, { useState, useEffect, Fragment } from 'react'
import { Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import StopList from '../../stop/stopList/stopList'
import { withFirestore } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createTour } from '../tourAction'
import cuid from 'cuid';
import TourMainNav from './TourMainNav';
import MapComponent from '../../../app/common/map/MapComponent';
import { usePosition } from '../../../app/common/map/usePosition';
import PeakMainLocation from './PeakMainLocation';
import { render } from 'react-dom';

const actions = {

}

const mapState = async (state, ownProps) => {
    let tourId;
    let tour = {}
    if (ownProps.match.tourId) {
        console.log("own", ownProps)
        tourId = ownProps.match.params.tourId;
        if (state.firestore.ordered.tours && state.firestore.ordered.stops.tours > 0) {
            tour = state.firestore.ordered.tours.filter(tour => tour.id === tourId)[0] || {}
        } else {
            console.log("Create id")
            tour = createTour(null)
        }
        return {
            initialValues: tour
        }
    }
    else {
        console.log("newTour")
        let current_location = {}
        /*navigator.geolocation.getCurrentPosition(function (position) {
            current_location = { lat: position.coords.latitude, lng: position.coords.longitude }
        });*/
        tour = {
            main_location: current_location
        }
        console.log("tour", tour)
        return {
            initialValues: tour
        }
    }


}

class TourControl extends Comment {

    //     const { initialValues } = props;
    // const [mainNavActive, setMainNav] = useState("Main Location");
    // const [markerList, setMarkerList] = useState([])
    // const [mapCenter, setCenter] = useState({})
    // const { latitude, setLatitude } = useState(0);
    // const { longitude, setLongitude } = useState(0);

    state = {
        markerList: [],
        mainNavActive: 'Main Location',
        mapCenter: {}
    }
    constructor() {
        super();
        this.state = {
            markerList: [],
            mainNavActive: 'Main Location',
            mapCenter: {}
        }
      }
    
    async componentDidMount() {
        const { firestore, match } = this.props
        if (match.params.stopId) {
            await firestore.setListener(`/tours/${match.params.stopId}`)
        }
    }
    async componentWillMount(){
        navigator.geolocation.getCurrentPosition(function (position) {
            this.state({ lat: position.coords.latitude, lng: position.coords.longitude })
        });
    }

    async componentWillUnmount() {
        const { firestore, match } = this.props;
        await firestore.unsetListener(`tours/${match.params.stopId}`)
    }

    addMarker = (lat, lng, color, name = null) => {
        let currentList = this.state.markerList;
        let newList = [...this.state.markerList, { lat: lat, lng: lng, color: color, name: name }]
        this.setState({ markerList: newList })
    }
    removeMarker = (lat, lng, color, name) => {
        if (name) {

            let newList = this.state.markerList.filter(marker =>
                marker.name === name)
            console.log("remove by name", this.state.markerList)
            console.log("remove by name", newList)
            this.setState({ markerList: newList })
        } else {
            let newList = this.state.markerList.filter(marker =>
                marker.lat !== lat &&
                marker.lng !== lng &&
                marker.color !== color)
            this.setState({ markerList: newList })
        }
    }

    handleClickMap = (e) => {
        if (this.state.mainNavActive === 'Main Location') {
            this.removeMarker(null, null, null, "main location");
            this.addMarker(e.lat, e.lng, 'red', "main location");
            let location = { lat: e.lat, lng: e.lng }
            try {
                this.props.change('main_location', location)
            } catch (error) {
                console.log(error)
            }
        }
    }

    handleMainLocation = (values) => {
        console.log("mainLocation", values)
    }

    renderMainNav = () => {
        switch (this.state.mainNavActive) {
            case 'Main Location':
                //etMapClick(()=>handleClickMap() )
                return (
                    <PeakMainLocation saveChanges={this.handleMainLocation} />
                );
            default:
                break;

        }
    }
    hansleMainNav = (active) => {
        this.setState({ mainNavActive: active })
    }
    render() {
        return (
            <Grid >
                <Grid.Column width={2}>
                    <TourMainNav activeTab={this.state.mainNavActive} handleTabChange={this.hansleMainNav} />
                </Grid.Column>
                <Grid.Column width={4}>
                    {this.renderMainNav()}
                </Grid.Column>
                <Grid.Column width={10}>
                    <MapComponent
                        markerList={this.state.markerList}
                        zoom={16}
                        center={this.state.mapCenter}
                        handleClickMap={this.handleClickMap}
                    />
                </Grid.Column>
            </Grid>
        )
    }
}

export default withFirestore(
    connect(mapState, actions)
        (reduxForm(
            {
                form: 'tourForm',
                enableReinitialize: true,
                destroyOnUnmount: false,
                forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
            })
            (TourControl)));