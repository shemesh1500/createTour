/*global google*/
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Form, Segment, Header } from 'semantic-ui-react';
import { createTour, updateTour, cancelToggle } from '../tourAction';
import TextInput from '../../../app/common/form/textInput';
import TextAreaInput from '../../../app/common/form/textAreaInput';
import DateInput from '../../../app/common/form/dateInput';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';
import PlaceInput from '../../../app/common/form/placeInput';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import SelectInput from '../../../app/common/form/selectInput';
import { withFirestore } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';

const actions = {
  createTour,
  updateTour,
  cancelToggle
}

const mapState = (state) => {
  let formValues = {}
  if (state.form.tourForm) {
    formValues = state.form.tourForm.values;
  }
  return {
    initialValues: formValues
  }


}

const validate = combineValidators({
  title: isRequired({ message: 'The tour "Title" is required' }),
  language: isRequired({ message: 'The tour "Language" is required' }),
  main_sentense: isRequired({ message: 'The tour "Main sentence" is required' }),
  description: composeValidators(
    isRequired({ message: 'The tour "Description" is required' }),
    hasLengthGreaterThan(5)({ message: 'Description must have at least 5 chars' })
  )(),
  Address: isRequired('Starting point tour'),
  rec_start_h: isRequired('Starting hour'),
  rec_end_h: isRequired('Until hour'),
  city: isRequired({ message: 'The tour "City" is required' }),
  street: isRequired('Street'),
  house_number: isRequired('House number'),
})

const audience = [
  { key: 'Singles', text: 'Singles', value: 'Singles' },
  { key: 'Couples', text: 'Couples', value: 'Couples' },
  { key: 'Kids friendly', text: 'Kids friendly', value: 'Kids friendly' },
  { key: 'Above 18', text: 'Above 18', value: 'Above 18' },
  { key: 'Pet friendly', text: 'Pet friendly', value: 'Pet friendly' },
];

const TourForm = (props) => {
  let history = useHistory();
  const [addLatlng, setLatLng] = useState()

  const onFormSubmit = async values => {
    console.log("values", values)
    try {
      if (props.initialValues.id) {
        // if (Object.keys(values).length === 0) {
        //   values.address_latlng = addLatlng
        // }
        props.updateTour(values)
        props.handleEditStat(false)

      } else {
        let createdTour = await props.createTour(values)
        //history.push(`/tourCreation/${createdTour.id}`)
      }
    } catch (error) {
      console.log(error)
    }

  };

  const handleCitySelect = (selctedCity) => {
    geocodeByAddress(selctedCity)
      .then(result => getLatLng(result[0]))
      .then(latlng => setLatLng(latlng))
      .then(() => props.change('city', selctedCity))
      .catch(error => console.log(error))
  }
  const handleAddressSelect = (selctedaddress) => {
    geocodeByAddress(selctedaddress)
      .then(result => getLatLng(result[0]))
      .then(latlng => props.change('address_latlng', latlng))
      .catch(error => console.log(error))
  }
  //render() {

  const { invalid, submitting, pristine, initialValues, cancelToggle } = props;
  return (
    <Segment>
      <Form onSubmit={props.handleSubmit(props.onFormSubmit)}>
        <Header sub color='teal' content="Tour Details" />
        <Field name="title" component={TextInput} placeholder="Tour title" />
        <Field name="language" component={TextInput} placeholder="Language of the tour" />
        <Header sub color='teal' content="Tour description" />
        <Field name="main_sentense" component={TextInput} placeholder="Kicking sentence about your tour" />
        <Field name="description" component={TextAreaInput} placeholder="Tell us more, what to expect?" rows={3} />
        <Header sub color='teal' content="Tour location" />
        <Field
          name="city"
          component={PlaceInput}
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
          component={PlaceInput}
          placeholder="Street"
          onSelect={handleAddressSelect}
        />
        <Field
          name="house_number"
          component={TextInput}
          placeholder="Address number"
          required
        />
        <Header sub color='teal' content="Recommended hours to take that tour" />
        <Field name="rec_start_h" component={DateInput} placeholder="From..."
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
        <Field name="rec_end_h" component={DateInput} placeholder="Until..."
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
        <Field
          name='audience'
          component={SelectInput}
          options={audience}
          value='audience.text'
          multiple={true}
          placeholder='Recommened audience'
        />


        <Button disabled={invalid || submitting } positive type="submit">
          Submit
          </Button>
        <Button onClick={() => props.handleEditStat(false)}>Cancel</Button>
        <Button
          type='button'
          color={initialValues.cancelled ? 'green' : 'red'}
          floated='right'
          content={initialValues.cancelled ? 'Reactivate tour' : 'Cancel tour'}
          onClick={() => cancelToggle(!initialValues.cancelled, initialValues.id)}
        />
      </Form>
    </Segment>
  )

}

export default withFirestore(connect(
  mapState,
  actions
)(reduxForm({
  form: 'tourForm', 
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(TourForm)));
