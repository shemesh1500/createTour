import React from 'react'
import { withFirestore } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Form, Header, Button } from 'semantic-ui-react';
import placeInput from '../../../app/common/form/placeInput';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';


const actions = {

}

const mapState = (state) => {
    let formValues = {}

    if (state.form.businessForm) {
        formValues = state.form.businessForm.values
    }
    return {
        initialValues: formValues
    }
}
const PeakLocation = (props) => {
    const { invalid, submitting } = props;

    const handleAddress = (address) => {
        geocodeByAddress(address)
            .then(result => getLatLng(result[0])
                .then(latlng => {
                    let location = { longitude: latlng.lng, latitude: latlng.lat }
                    props.change("stop_location", location)
                }
                ))
    }

    return (
        <div>
            <Form onSubmit={props.handleSubmit(props.onFormSubmit)}>
                <div className='peakLocationArea'>
                    <div className='peakLocationInput'>
                        <Field
                            component={placeInput}
                            className='locationInput'
                            onSelect={handleAddress}
                            name='location'
                            placeholder='Business location'
                        />
                    </div>
                </div>
                <button className='saveBusinessButton' disabled={invalid || submitting} positive type="submit">
                save & continue
          </button>
            </Form>
        </div>
    )
}

export default withFirestore(connect(
    mapState,
    actions
)(reduxForm({
    form: 'businessForm',
    //validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(PeakLocation)));