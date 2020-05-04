
import React from 'react'
import { Segment, Form, Header, Button } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';
import TextInput from '../../../app/common/form/textInput';
import SelectInput from '../../../app/common/form/selectInput';
import { connect } from 'react-redux';
import TextAreaInput from '../../../app/common/form/textAreaInput';

const actions = {

}

const mapState = (state) => {
    let formValues = {}
    if (state.form.stopForm) {
        formValues = state.form.stopForm.values;
    }
    return {
        initialValues: formValues
    }


}

const validate = combineValidators({
    s_title: isRequired({ message: 'Stop title is required' }),
    s_smallDesc: composeValidators(
        isRequired({ message: 'Small description about the stop is required' }),
        hasLengthGreaterThan(8)({ message: 'Small description must have more then 8 characters' })
    )()
})

const tags = [
    { key: 'architecture', text: 'Architecture', value: 'architecture' },
    { key: 'culture', text: 'Culture', value: 'culture' },
    { key: 'gurdens', text: 'Gurdens', value: 'gurdens' },
    { key: 'food', text: 'Food', value: 'food' },
    { key: 'music', text: 'Music', value: 'music' },
    { key: 'history', text: 'History', value: 'history' },
];

//class StopForm extends Component {
const StopForm = (props) => {
    const { handleSubmit, pristine, reset, submitting, saveChanges, setRouteStatus } = props
    console.log("STOP FORM", props.initialValues)

    /* const onFormSubmit = values => {
        if (this.props.initValues.id) {
            console.log("UPDATE STOP");
            this.props.history.push(`tours/${this.props.tourId}`)
        }
        else {
            console.log('CREATE STOP')
            this.props.history.push(`tours/${this.props.tourId}`)
        }
    }

   const handleAddressSelect = selectedCity => {
        geocodeByAddress(selectedCity)
            .then(res => getLatLng(res[0]))
            .then(latlng => this.setState({
                latlng: latlng
            }))
            .then(latlen => this.props.change('city', selectedCity))
    }
*/
    //render() {

    return (
        <Segment>
            <Form onSubmit={handleSubmit(saveChanges)}>
                <Header sub color='teal' content='General info' />
                <Field name='s_title' component={TextInput} placeholder='Stop title' />
                <Field
                    name='tags'
                    component={SelectInput}
                    options={tags}
                    value='tags.text'
                    multiple={true}
                    placeholder='Tag this stop'
                />
                <Field
                    name='s_smallDesc'
                    placeholder='Small description about this stop'
                    component={TextAreaInput}
                    rows={2}
                />
                <Button.Group>
                <Button onClick={() => setRouteStatus('Stops List')}>Cancel</Button>
                <Button.Or />
                <Button disabled={props.invalid} positive type="submit">Save</Button>
            </Button.Group>
            </Form>
        </Segment>
    )
    //}
}

export default connect(
    mapState,
    actions
)(reduxForm({
    form: 'stopForm',
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(StopForm));