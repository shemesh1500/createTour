import React, { Component } from 'react'
import { Grid, GridRow, Button } from 'semantic-ui-react';
import StopCreationNav from './StopCreationNav'
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import PeakLocation from './PeakLocation';
import StopForm from './stopForm/StopForm';
import StopMedia from './StopMedia';
import { reduxForm, Form } from 'redux-form';
import { createStop, updateStop } from './stopAction'
import cuid from 'cuid';

const actions = {
    createStop,
    updateStop
}

const mapState = (state, ownProps) => {
    let stopId;
    let tourOwnerId;
    let stop = {}
    if (ownProps.match) {
        tourOwnerId = ownProps.match.params.tourId;
        stopId = ownProps.match.params.stopId;
        if (state.firestore.ordered.stops && state.firestore.ordered.stops.length > 0) {
            stop = state.firestore.ordered.stops.filter(stop => stop.id === stopId)[0] || {}
        } else {
            console.log("Create id")
            stopId = cuid()
        }
    }
    
    /*if (state.form) {
        formValues = state.form.stopForm.values
    } else {
        console.log("Create id2")
        formValues = {
            stopId: stopId
        }
    }
    console.log("stop", stop)
    console.log(initialValues)*/

    return {
        stop,
        tourOwnerId,
        initialValues: stop
    }
}


class StopCreation extends Component {
    state = {
        tabName: 'Location',
        editInfo: false,
    }
    handleTabChange = (name) => this.setState({ tabName: name })
    handleEditStat = (stat) => this.setState({ editInfo: stat })

    async componentDidMount() {
        const { firestore, match } = this.props
        if (match.params.stopId) {
            await firestore.setListener(`/stops/${match.params.stopId}`)
        }
    }
    async componentWillUnmount() {
        const { firestore, match } = this.props;
        await firestore.unsetListener(`stops/${match.params.stopId}`)
    }

    onFormSubmit = async (values) => {
        try {
            if (values.s_title) {
                this.props.updateStop(values)
            }
            else {
                let created_stop_id = await this.props.createStop(values, this.props.tourOwnerId)
                
                this.props.change('id', created_stop_id)
            }
        } catch (error) {
            console.log(error)
        }
    }

    switchRenderFunction(tagName, stop) {
        switch (tagName) {
            case 'Location':
                return <PeakLocation saveChanges={this.onFormSubmit} />;
            case 'General Info':
                return <StopForm saveChanges={this.onFormSubmit} />;
            case 'Media':
                return <StopMedia saveChanges={this.onFormSubmit} />
            default:
                break;
        }
    }



    render() {
        const { stop } = this.props
        return (
            <Grid>
                <GridRow>
                    <StopCreationNav activeTab={this.state.tabName} handleTabChange={this.handleTabChange} />
                    <Button onClick={() => this.onFormSubmit(this.props.initialValues)} />
                </GridRow>
                <Grid.Column width={16} >

                    {this.switchRenderFunction(this.state.tabName, stop)}

                </Grid.Column>

            </Grid>
        )
    }
}

export default withFirestore(
    connect(mapState, actions)
        (reduxForm({
            form: 'stopForm',
            enableReinitialize: true,
            destroyOnUnmount: false,
            forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
        })(StopCreation)))
