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
    const { handleSubmit, saveChanges, setZoom, setCenter, setSelectMarker, initialValues } = props

    /*const handleAddress = (address) => {
        console.log("add", address)
       geocodeByAddress(address)
           .then(result => getLatLng(result[0])
               .then(latlng => {
                   props.change('main_location', latlng)
                   setCenter(latlng)
                   setZoom(16)
               }
               ))
   }
   */
    const [addLatlng, setLatLng] = useState()
    const handleCitySelect = (selctedCity) => {
        geocodeByAddress(selctedCity)
            .then(result => getLatLng(result[0]))
            .then(latlng => (setLatLng(latlng), setCenter(latlng), setZoom(6), setSelectMarker(latlng)))
            .then(() => props.change('city', selctedCity))
            .catch(error => console.log(error))
    }
    const handleAddressSelect = (selctedaddress) => {
        geocodeByAddress(selctedaddress)
            .then(result => getLatLng(result[0]))
            .then(latlng => ( props.change('main_location', latlng), setCenter(latlng), setZoom(17), setSelectMarker(latlng)))
            .catch(error => console.log(error))
    }

    const handleNumberSelect = (selctedaddress) => {
        console.log("select number")
        geocodeByAddress( props.initialValues.street +  selctedaddress)
            .then(result => getLatLng(result[0]))
            .then(latlng => ( props.change('address_latlng', latlng) ))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        if (props.initialValues.main_location) {
            console.log("lat , lng", props.initialValues.main_location)
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${props.initialValues.main_location.lat},${props.initialValues.main_location.lng}&key=AIzaSyBVQvaXJjGPf8vsfUG9NT_VdcBWNLbiGAg`)
                .then(response => (
                    props.change('house_number',response.data.results[0].address_components[0].long_name),
                    props.change('street',response.data.results[0].address_components[1].long_name),
                    props.change('city',response.data.results[0].address_components[2].long_name)
                    ))
        }
        return () => {
            //console.log("lat , lng", props.tourForm.values.mainLocation)
        }
    }, [props.initialValues.main_location])//.tourForm.values.mainLocation])
    const handleFullAddress = () => {
        console.log("lat , lng", props.tourForm.values.mainLocation)
        // axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyBVQvaXJjGPf8vsfUG9NT_VdcBWNLbiGAg')
        // .then(response => console.log(response))
    }
    return (
        <Fragment>
            <Header sub color='teal' content="Type exact address OR Use the map" />
            <Form onSubmit={handleSubmit(saveChanges)}>
                <Field
                    name="city"
                    component={placeInput}
                    options={{ types: ['(cities)'] }}
                    placeholder="City"
                    onSelect={handleCitySelect} />
                <Field
                    name="street"
                    options={{
                        location: new google.maps.LatLng(addLatlng),
                        radius: 1000,
                        types: ['address'],
                    }}
                    component={placeInput}
                    placeholder="Street"
                    onSelect={handleAddressSelect}
                />
                <Field
                    name="house_number"
                    component={TextInput}
                    placeholder="Address number"
                    //onSelect={handleNumberSelect}
                    required
                />
                <Field
                    component={TextInput}
                    //value={stopLocation.lat}
                    placeholder='Latitude'
                    name='main_location.lat'
                    required
                />
                <Field
                    component={TextInput}
                    //value={stopLocation.lng}
                    placeholder='longitude'
                    name='main_location.lng'
                    required
                />
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
