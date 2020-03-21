import React, { Component } from 'react'
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Form, Segment, Header } from 'semantic-ui-react';
import { createTour, updateTour } from '../tourAction';
import cuid from 'cuid';
import TextInput from '../../../app/common/form/textInput';
import TextAreaInput from '../../../app/common/form/textAreaInput';
import CheckboxInput from '../../../app/common/form/checkboxInput';
import DateInput from '../../../app/common/form/dateInput';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';



const mapState = (state, ownProps) => {
  const tourId = ownProps.match.params.id;

  let tour = {
  };

  if (tourId && state.tours.length > 0) {
    tour = state.tours.filter(tour => tour.id === tourId)[0]
  } else {
    tour = {
      audience: [],
      stops: []
    };
  }

  return {
    initialValues: tour
  }
}

const actions = {
  createTour,
  updateTour
}

const validate = combineValidators({
  title: isRequired({ message: 'The tour "Title" is required' }),
  language: isRequired({ message: 'The tour "Language" is required' }),
  main_sentense: isRequired({ message: 'The tour "Main sentence" is required' }),
  description: composeValidators(
    isRequired({ message: 'The tour "Description" is required' }),
    hasLengthGreaterThan(5)({ message: 'Description must have at least 5 chars' })
  )(),
  city: isRequired({ message: 'The tour "City" is required' }),
  Address: isRequired('Starting point tour'),
  rec_start_h: isRequired('Starting hour'),
  rec_end_h: isRequired('Until hour'),

})


class tourForm extends Component {

  onFormSubmit = values => {
    if (this.props.initialValues.id) {
      this.props.updateTour(values)
      this.props.history.push(`/tours/${this.props.initialValues.id}`)
    } else {
      //update the creation date to current
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var audience = this.props.initialValues.audience;
      const newTour = {
        ...values,
        id: cuid(),
        audience,
        profile_pic: '/assets/user.png',
        c_date: date + ' ' + time
      }
      console.log("new ", newTour)
      this.props.createTour(newTour);
      this.props.history.push(`/tours/${newTour.id}`);
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

  render() {
    const { submitting, pristine, invalide } = this.props;
    let singles;
    let couples;
    let Kfriendly;
    let Above18;
    let Pfriendly;
    if (Object.entries(this.props.initialValues).length !== 0) {
      singles = this.props.initialValues.audience.indexOf('Singles') > -1 ? 'defaultChecked' : null;
      couples = this.props.initialValues.audience.indexOf('Couples') > -1 ? 'defaultChecked' : null;
      Kfriendly = this.props.initialValues.audience.indexOf('Kid friendly') > -1 ? 'defaultChecked' : null;
      Above18 = this.props.initialValues.audience.indexOf('Above 18') > -1 ? 'defaultChecked' : null;
      Pfriendly = this.props.initialValues.audience.indexOf('Pet friendly') > -1 ? 'defaultChecked' : null;
    }

    return (
      <Segment>
        <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
          <Header sub color='teal' content="Tour Details" />
          <Field name="title" component={TextInput} placeholder="Tour title" />
          <Field name="language" component={TextInput} placeholder="Language of the tour" />
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
          <Form.Field>
            <label>Ideal Audience</label>
            <Field name='Single' component={CheckboxInput} label='Singles' defaultChecked={singles} onChange={this.onChecked} />
            <Field name='Couples' component={CheckboxInput} label='Couples' defaultChecked={couples} onChange={this.onChecked} />
            <Field name='Kid friendly' component={CheckboxInput} label='Kid friendly' defaultChecked={Kfriendly} onChange={this.onChecked} />
            <Field name='Above 18' component={CheckboxInput} label='Above 18' defaultChecked={Above18} onChange={this.onChecked} />
            <Field name='Pet friendly' component={CheckboxInput} label='Pet friendly' defaultChecked={Pfriendly} onChange={this.onChecked} />
          </Form.Field>
          <Field name="main_sentense" component={TextInput} placeholder="Kicking sentence about your tour" />
          <Field name="description" component={TextAreaInput} placeholder="Tell us more, what to expect?" rows={3} />
          <Field name="Address" component={TextInput} placeholder="Where do you take us today?" />
          <Button disable={invalide || submitting || pristine} positive type="submit">
            Submit
          </Button>
          <Button onClick={this.props.initialValues.id
            ? () => this.props.history.push(`/tours/${this.props.initialValues.id}`)
            : () => this.props.history.push('/tours')} type="button">Cancel</Button>
        </Form>
      </Segment>
    )
  }
}

export default connect(
  mapState,
  actions
)(reduxForm({ form: 'tourForm', validate })(tourForm));