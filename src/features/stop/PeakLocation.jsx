import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon, Grid, Form, Button } from 'semantic-ui-react';
import placeInput from '../../app/common/form/placeInput';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import { usePosition } from '../../app/common/map/usePosition';
import TextInput from '../../app/common/form/textInput';
import { combineValidators, isRequired } from 'revalidate';
import { createStop, updateStop } from './stopAction'

const actions = {
    createStop,
    updateStop
}

const mapState = (state) => {
    let initVal = {}
    if (state.form.stopForm) {
        initVal = state.form.stopForm.values
    }
    return {
        initialValues: initVal,
        //values: getFormValues('stopForm')(state)
    }
}

const validate = combineValidators({
    stop_location: isRequired({ message: "Specific location is required" })
})

const PeakLocation = (props) => {
    //get the current location of the user
    const { latitude, longitude, error } = usePosition();
    const [stopLocation, setLocation] = useState({})
    const { createStop, updateStop, saveChanges, handleSubmit } = props
    const defaultProps = {
        center: {
            lat: latitude,
            lng: longitude
        },
        zoom: 15
    };

    useEffect(() => {
        if (!props.initialValues.stop_location) {
            if (latitude && longitude) {
                setLocation({ lat: latitude, lng: longitude })
                props.change('stop_location', { lat: latitude, lng: longitude })
            }
        } else {
            setLocation(props.initialValues.stop_location)
        }
    }, [latitude, longitude]);


    const handleAddress = (address) => {
        geocodeByAddress(address)
            .then(result => getLatLng(result[0])
                .then(latlng => {
                    setLocation(latlng);
                    props.change('stop_location', latlng)
                }
                ))
    }

    const handleAddressPeak = values => {
        console.log('values', values)
    }

    const handleClickMap = (e) => {
        setLocation({ lat: e.lat, lng: e.lng })
        let location = { lat: e.lat, lng: e.lng }
        try {
            props.change('stop_location', location)
        } catch (error) {
            console.log(error)
        }

    }

    const onSaveClick = async (values) => {
        try {
            if (props.initialValues.id) {
                await updateStop(values)
            }
            else {
                await createStop(values)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Grid key={latitude}>
            <Grid.Column width={4}>

                <Form onSubmit={handleSubmit(saveChanges)}>
                    <Field
                        component={placeInput}
                        onSelect={handleAddress}
                        name='location'
                        placeholder='Stop location'
                    />
                    <Field
                        component={TextInput}
                        //value={stopLocation.lat}
                        placeholder='Latitude'
                        name='stop_location.lat'
                    />
                    <Field
                        component={TextInput}
                        //value={stopLocation.lng}
                        placeholder='longitude'
                        name='stop_location.lng'
                    />
                    <Button disabled={props.invalid} positive type="submit" >
                        Save & Continue
                    </Button>
                </Form>
            </Grid.Column>
            <Grid.Column width={12}>
                <div style={{ height: '400px', width: '100%' }} >
                    {stopLocation && stopLocation.lat !== undefined && stopLocation.lng !== undefined &&
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyBVQvaXJjGPf8vsfUG9NT_VdcBWNLbiGAg' }}
                            center={stopLocation}
                            defaultZoom={defaultProps.zoom}
                            onClick={handleClickMap}
                        >
                            <Icon name='marker' size='big' color='red'
                                lat={stopLocation.lat}
                                lng={stopLocation.lng}
                            />
                        </GoogleMapReact>
                    }


                </div>
            </Grid.Column>
        </Grid>
    );

}

export default connect(mapState, actions)(reduxForm({
    form: 'stopForm',
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(PeakLocation));