import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Card, Button, Segment, Icon, Image, Dropdown } from 'semantic-ui-react';
import CreateStop from '../../stop/stopCreation/CreateStop';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import StopList from '../../stop/stopList/StopList';
import { updateStop, deleteStop } from '../../stop/stopAction'
import { useEffect } from 'react';
import '../../../style/tourControl.css'
import '../../../style/createRoute.css'

const query = (props) => {
    let tourId;
    if (props.tourId) {
        tourId = props.tourId
    }
    else if (props.initialValues.tourId) {
        tourId = props.initialValues.tourId
    }
    return [
        {
            collection: 'tours',
            doc: tourId,
            subcollections: [{ collection: 'stops' }],
            storeAs: 'stops'
        }
    ]
}

const actions = {
    updateStop,
    deleteStop
}

const mapState = (state, props) => {
    return {
        //tourId: props.tourId,
        initialValues: state.form.tourForm.values,
        loading: state.async.loading,
        all_stops: state.firestore.ordered.stops
    }
}

const CreateRoute = (props) => {
    const { setMarker, setCenter, all_stops, tourId, updateStop, setMarkerList, mapMarkers, deleteStop } = props

    const [routeStatus, setRouteStatus] = useState('Stops List')
    const [currentStopId, setStopId] = useState(null)

    useEffect(() => {
        if (all_stops && mapMarkers && all_stops.length > 0) {
            console.log("change all_stops", all_stops)
            all_stops.map(stop => setMarkerList([...mapMarkers, stop.stop.location]))
        }
    }, [all_stops])

    const setOrderList = (updated_list) => {
        console.log('updated stops',updated_list)
        updated_list.map((stop, index) => stop.order = index)
    }

    const saveChanges = async  () => {
        console.log('BEFORE update', all_stops)
        all_stops.map((stop) => console.log("save changes", stop))
        await all_stops.map(async (stop) => (console.log("all stops", all_stops), await updateStop(tourId, stop)))
        console.log("AFTER update", all_stops)
        let markerStops = []
        all_stops.sort((a, b) => a.order > b.order)
        all_stops.map(stop => markerStops = [...markerStops, { location: stop.stop_location, order: stop.order }])
        setMarkerList(markerStops)
    }

    const renderStopFunc = (item) => {
        return (
            <div className='stopCard'>
                <div>
                    <h4>{item.order + 1}</h4>
                </div>
                <div>
                    <h4>{item.location}</h4>
                </div>
                <div >
                    <Button.Group>
                        <Button onClick={() => deleteStop(item)}>Delete</Button>
                        <Button.Or />
                        <Button positive onClick={() => {
                            setStopId(item.id);
                            setRouteStatus('Create Stop');
                        }}>Edit</Button>
                    </Button.Group>
                </div>
            </div>
        )
    }

    const stopsList = () => {
        console.log("all_stops", all_stops)
        return (
            <div>
                {all_stops && <StopList
                    listItems={all_stops}
                    setList={setOrderList}
                    renderingFunc={renderStopFunc}
                    handleDeleteStop={handleDeleteStop}
                />}
                <button className='saveButton' onClick={saveChanges} >Save Changes</button>
            </div>
        )
    }

    const createNewStop = () => {
        console.log("create stop", currentStopId, tourId)
        if (tourId) {
            return (<CreateStop
                setMarker={setMarker}
                setCenter={setCenter}
                tourId={tourId}
                stopId={currentStopId}
                all_stops={all_stops}
                setRouteStatus={setRouteStatus}
            />)
        }
        else {
            return <div>Peak Main location first</div>
        }

    }
    const handleDeleteStop = (stop) => {
        deleteStop(stop)
        setOrderList(all_stops)
    }

    const tourStatus = (stopId) => {
        console.log(" route status", routeStatus)
        switch (routeStatus) {
            case 'Stops List':
                return stopsList()
            case 'Create Stop':
                return createNewStop(null)
            case 'Edit Stop':
                return createNewStop(stopId)
            default:
                break;
        }
    }

    const options = [
        { key: 1, text: 'Add main stop', value: 1 },
        { key: 2, text: 'Choice 2', value: 2 },
        { key: 3, text: 'Choice 3', value: 3 },
      ]
      const handleDropdown = (e, data) => {
        switch (data.value){
            case 1:
                setRouteStatus('Create Stop')
                return;
            default:
                break;
        }
        
        
     }
      
    return (
        <div className='mainZone'>
            <div className='createHeader'>
                <div className='createText'>
                    <div className='mainHeader'>Route creation</div>
                    <div className='subHeader'>Here you can build all the points of the tour and arage it as you wish</div>
                </div>
                <div>
                    <Dropdown className='addNewStop' text='Add new stop' options={options} onChange={handleDropdown} />
                </div>
            </div>
            {tourStatus()}
        </div>
    )
}

//  export default compose(
//      firestoreConnect(props => query(props)),
//      connect(mapState, actions)
//  )(CreateRoute);
export default connect(mapState, actions)(CreateRoute)

/* <Card key={item.id}>
                <Card.Content>
                    <Image
                        floated='right'
                        size='mini'
                        src={item.profile_image && item.profile_image}
                    />
                    <Card.Header>{item.s_title}</Card.Header>
                    <Card.Description>
                        {item.s_smallDesc}
                        {item.location}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='eye' />
                        {item.all_media.length} media
                     </a>
                    <Button.Group>
                        <Button onClick={() => deleteStop(item)}>Delete</Button>
                        <Button.Or />
                        <Button positive onClick={() => {
                            setStopId(item.id);
                            setRouteStatus('Create Stop');
                        }}>Edit</Button>
                    </Button.Group>
                </Card.Content>
            </Card>)*/