/*global google*/
import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { combineValidators, isRequired } from 'revalidate'
import { Form, Button, Header } from 'semantic-ui-react'
import TextInput from '../../../app/common/form/textInput'
import placeInput from '../../../app/common/form/placeInput'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import axios from 'axios'

const mapState = (state) => {
    let initVal = {}
    if (state.form.tourForm) {
        initVal = state.form.tourForm.values
    }
    return {
        initialValues: initVal,
    }
}

const validate = combineValidators({
    stop_location: isRequired({ message: "Specific location is required" })
})

const PeakMainLocation = (props) => {
    const { handleSubmit, saveChanges,  setSelectMarker } = props

    const [addLatlng, setLatLng] = useState()
    const handleAddress = (address) => {
        geocodeByAddress(address)
            .then(result => getLatLng(result[0])
                .then(latlng => {
                    setLatLng(latlng);
                    props.change('main_location', latlng, setSelectMarker(latlng))
                }
                ))
    }
    const handleCitySelect = (selctedCity) => {
        geocodeByAddress(selctedCity)
            .then(result => getLatLng(result[0]))
            .then(latlng => (setLatLng(latlng),  setSelectMarker(latlng)))
            .then(() => props.change('city', selctedCity))
            .catch(error => console.log(error))
    }
    const handleAddressSelect = (selctedaddress) => {
        geocodeByAddress(selctedaddress)
            .then(result => getLatLng(result[0]))
            .then(latlng => (props.change('main_location', latlng),  setSelectMarker(latlng)))
            .catch(error => console.log(error))
    }

    const handleNumberSelect = (selctedaddress) => {
        console.log("select number")
        geocodeByAddress(props.initialValues.street + selctedaddress)
            .then(result => getLatLng(result[0]))
            .then(latlng => (props.change('address_latlng', latlng)))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        if (props.initialValues.main_location) {
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${props.initialValues.main_location.lat},${props.initialValues.main_location.lng}&key=AIzaSyBVQvaXJjGPf8vsfUG9NT_VdcBWNLbiGAg`)
                .then(response => (
                    props.change('house_number', response.data.results[0].address_components[0].long_name),
                    props.change('street', response.data.results[0].address_components[1].long_name),
                    props.change('city', response.data.results[0].address_components[2].long_name)
                ))
        }
        return () => {
        }
    }, [props.initialValues.main_location])//.tourForm.values.mainLocation])
 
    return (
        <Fragment>
            <Header sub color='teal' content="Type exact address OR Use the map" />
            <Form onSubmit={handleSubmit(saveChanges)}>
                <Field
                    name="tour_name"
                    component={TextInput}
                    placeholder="Tour title" />
                <Button disabled={props.invalid} positive type="submit" >
                    Save & Continue
            </Button>
            </Form>
        </Fragment>
    )
}

export default connect(mapState)(reduxForm({
    form: 'tourForm',
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(PeakMainLocation));
