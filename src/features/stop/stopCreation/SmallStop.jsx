import React, { useState } from 'react'
import SmallStopNav from './SmallStopNav'
import { Segment } from 'semantic-ui-react'
import PeakLocationGeneric from './PeakLocationGeneric'
import {createStop , updateStop} from '../stopAction'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import SmallStopMedia from './SmallStopMedia'

const actions = {
    createStop,
    updateStop
}

const mapState = (state, props) => {
    let stop = {}
    let stopId;
    if(props.stopId !== null){
        stopId = props.stopId
        if(props.all_stops){
            stop = props.all_stops.filter(stop => stop.id === stopId)[0]
        }
    }
    
    return { 
        initialValues : stop
    }
}

const SmallStop = ({setRouteStatus , all_stops, tourId, updateStop, createStop , setMarker, setCenter, stopId}) => {

    const [tabName, settabName] = useState("Location")

    const handleSubmit = async (values) => {
        console.log("add or update stop", values);
        try {
            if (stopId) {
                await updateStop(tourId, values)
            }
            else {
                /* let created_stop_id = */ await createStop(values, tourId, all_stops.length, 'smallStop')
                //props.change('id', created_stop_id)
                //await updateStop(tourId, values)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const switchRenderFunction = () => {    
        switch(tabName){
            case 'Location' : 
                return <PeakLocationGeneric saveChanges={handleSubmit} setRouteStatus={setRouteStatus} setMarker={setMarker} setCenter={setCenter} />
            case 'Context' :
                if (!stopId){
                    return <div>Please add location first</div>
                }
                return <SmallStopMedia saveChanges={handleSubmit} tourId={tourId} stopId={stopId} />
            default:
                break;
        }
    }

    return (
        <div>
            <SmallStopNav activeTab={tabName} handleTabChange={settabName} />
            <Segment attached='bottom'>
            {switchRenderFunction()}
            </Segment>
        </div>
    )
}

export default connect(mapState, actions)  (reduxForm({
    form: 'smallStopForm',
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})
    (SmallStop))
