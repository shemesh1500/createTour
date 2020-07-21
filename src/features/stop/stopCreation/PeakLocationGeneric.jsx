import React, { useState } from 'react';
import { Form,  Divider } from 'semantic-ui-react';
import placeInput from '../../../app/common/form/placeInput';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import TextInput from '../../../app/common/form/textInput';
import { combineValidators, isRequired } from 'revalidate';
import { createStop, updateStop } from '../stopAction'

//import '../../../style/stopCreation.css'

const actions = {
    createStop,
    updateStop
}

const mapState = (state) => {
    let initVal = {}
    if (state.form.smallStopForm) {
        initVal = state.form.smallStopForm.values
    }
    return {
        initialValues: initVal,
        //values: getFormValues('stopForm')(state)
    }
}

const validate = combineValidators({
    stop_location: isRequired({ message: "Specific location is required" })
})

const PeakLocationGeneric = (props) => {
    //get the current location of the user
    const [stopLocation, setLocation] = useState({})
    const { saveChanges, handleSubmit, setMarker, setCenter, setRouteStatus } = props


    const handleAddress = (address) => {
        geocodeByAddress(address)
            .then(result => getLatLng(result[0])
                .then(latlng => {
                    setLocation(latlng);
                    props.change('stop_location', latlng, setMarker(latlng), setCenter(latlng))
                }
                ))
    }


    return (
        <div className='allLocationForm'>
            <Form onSubmit={handleSubmit(saveChanges)}>
                <div className='innerLocatioForm'>
                    <div className='locationInput'>
                        <Field
                            component={placeInput}
                            className='locationInput'
                            onSelect={handleAddress}
                            name='location'
                            placeholder='Stop location'
                        />
                    </div>
                    <div>
                        <Divider horizontal>Or</Divider>
                        <div className='locationFooter'>
                            <div className='cordInput'>
                                <h4>Latitude</h4>
                                <Field
                                    component={TextInput}
                                    className='cordInput'

                                    //value={stopLocation.lat}
                                    placeholder='Latitude'
                                    name='stop_location.lat'
                                />
                            </div>
                            <div className='cordInput'>
                                <h4>Longitude</h4>
                                <Field
                                    component={TextInput}
                                    className='cordInput'
                                    //value={stopLocation.lng}
                                    placeholder='Longitude'
                                    name='stop_location.lng'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div >
                    <button className='saveButton' onClick={() => setRouteStatus('Stops List')}>Cancel</button>
                    <button className='saveButton' disabled={props.invalid} positive type="submit">Save</button>
                    
                </div>
            </Form>
        </div>

    );

}

export default connect(mapState, actions)(reduxForm({
    form: 'smallStopForm',
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(PeakLocationGeneric));