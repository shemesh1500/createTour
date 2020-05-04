/*global google*/
import React, { Component } from 'react'
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


const mapState = (state, ownProps) => {
  let tourId
  if (ownProps.match) {
    tourId = ownProps.match.params.id;
  } else {
    tourId = this.props.match.params.id
  }

  let tour = { };

  if (state.firestore.ordered.tours && state.firestore.ordered.tours.length > 0) {
    tour = state.firestore.ordered.tours.filter(tour => tour.id === tourId)[0] || {}
  }

  return {
    initialValues: tour,
    tour
  }
}

const actions = {
  createTour,
  updateTour,
  cancelToggle
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
  { key: 'singles', text: 'Singles', value: 'singles' },
  { key: 'couples', text: 'Couples', value: 'couples' },
  { key: 'Kfriendly', text: 'Kids friendly', value: 'Kfriendly' },
  { key: 'Above18', text: 'Above 18', value: 'Above18' },
  { key: 'Pfriendly', text: 'Pet friendly', value: 'Pfriendly' },
];

class tourForm extends Component {

  state = {
    address_latlng: {}
  }

  async componentDidMount() {
    const { firestore, match } = this.props;

    await firestore.setListener(`tours/${match.params.id}`)
    /*GET insted Listener
    let tour = await firestore.get(`tours/${match.params.id}`);
    if (!tour.exists) {
      history.push('/tours');
      toastr.error('Sorry', 'Tour not found')
    } else {
      this.setState({
        address_latlng: tour.data().address_latlng
      })
    }*/
  }
  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`tours/${match.params.id}`)
  }

  onFormSubmit = async values => {
    try {
      if (this.props.initialValues.id) {
        if (Object.keys(values).length === 0) {
          values.address_latlng = this.props.tour.address_latlng
        }
        this.props.updateTour(values)
        this.props.history.push(`/tours/${this.props.initialValues.id}`)
      } else {
        let createdTour = await this.props.createTour(values)
        this.props.history.push(`/tours/${createdTour.id}`);
      }
    } catch (error) {
      console.log(error)
    }

  };

  onChecked = (evt) => {
    if (evt.checked) {
      this.props.initialValues.audience.push(evt.name)
    }
    else {
      let indexOf = this.props.initialValues.audience.indexOf(evt.name);
      if (indexOf > -1) {
        this.props.initialValues.audience.splice(indexOf, 1)
      }
    }
  }

  handleCitySelect = (selctedCity) => {
    geocodeByAddress(selctedCity)
      .then(result => getLatLng(result[0]))
      .then(latlng => this.setState({
        address_latlng: latlng
      }))
      .then(() => this.props.change('city', selctedCity))
  }

  render() {
    const { invalid, submitting, pristine, initialValues, cancelToggle, tour } = this.props;
    return (
      <Segment>
        <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
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
            onSelect={this.handleCitySelect} />
          <Field
            name="street"
            options={{
              location: new google.maps.LatLng(this.state.address_latlng),
              radius: 1000,
              types: ['address'],
            }}
            component={PlaceInput}
            //onSelect={this.handleCitySelect}
            placeholder="Street"
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


          <Button disabled={invalid || submitting || pristine} positive type="submit">
            Submit
          </Button>
          <Button onClick={this.props.initialValues.id
            ? () => this.props.history.push(`/tours/${this.props.initialValues.id}`)
            : () => this.props.history.push('/tours')} type="button">Cancel</Button>
          <Button
            type='button'
            color={initialValues.cancelled ? 'green' : 'red'}
            floated='right'
            content={initialValues.cancelled ? 'Reactivate tour' : 'Cancel tour'}
            onClick={() => cancelToggle(!tour.cancelled, tour.id)}
          />
        </Form>
      </Segment>
    )
  }
}

export default withFirestore(connect(
  mapState,
  actions
)(reduxForm({ form: 'tourForm', validate, enableReinitialize: true })(tourForm)));

