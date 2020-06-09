import React, { useState } from 'react'
import { Segment } from 'semantic-ui-react'
import StopCreationNav from './StopCreationNav'
import PeakLocation from './PeakLocation'
import StopForm from './StopForm'
import { createStop, updateStop, addStopToTour } from '../stopAction'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import StopMedia from './StopMedia'
import '../../../style/stopCreation.css'

const actions = {
    createStop,
    addStopToTour,
    updateStop
}

const mapState = (state, props) => {
    let stopId ;
    let tourId = props.tourId;
    let stop = {}
    if(props.stopId !== null){
        stopId = props.stopId;
        if(props.all_stops){
            stop = props.all_stops.filter(stop => stop.id === stopId)[0]
        }
    }
    return{
        initialValues : stop,
        tourId : tourId,
    }

}

const CreateStop = (props) => {
    const {  setMarker, setCenter, tourId, createStop, updateStop, setRouteStatus, all_stops } = props;
    const [tabName, handleTabChange] = useState('Location')

    const handleSubmit = async (values) => {
        try {
            console.log("values", values)
            if (values.id) {
                console.log("update", values, tourId)
                await updateStop(tourId, values)
            }
            else {
                console.log("create", values, tourId)
                let created_stop_id = await createStop(values, tourId, all_stops.length)
                /*const stopRef = {
                    id: created_stop_id, 
                    title : values.s_title,
                    latlng : values.stop_location,
                    location : values.location
                }*/
                //console.log("stopRef", stopRef)
                //addStopToTour(created_stop_id, tourId, all_stops)
                //addStopToTour(all_stops, stopRef)
                console.log("stopCreared", created_stop_id)
                props.change('id', created_stop_id)
                console.log("props after change id", props)
            }
        } catch (error) {
            console.log(error)
        }
    } 

    const switchRenderFunction = () => {
        switch (tabName) {
            case 'Location':
                return <PeakLocation saveChanges={handleSubmit} setMarker={setMarker} setCenter={setCenter} setRouteStatus={setRouteStatus}/>;
            case 'General Info':
                return <StopForm saveChanges={handleSubmit} setRouteStatus={setRouteStatus} />;
            case 'Media':
                return <StopMedia saveChanges={handleSubmit} tourId={tourId}/>
            default:
                break;
        }
    }
    return (
        <div className='allCreation'>
            <StopCreationNav activeTab={tabName} handleTabChange={handleTabChange} />
            <Segment attached='bottom'>
            {switchRenderFunction()}
            </Segment>
        </div>
    )
}

export default connect(mapState, actions)
    (reduxForm({
        form: 'stopForm',
        enableReinitialize: true,
        destroyOnUnmount: false,
        forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    })
        (CreateStop))
