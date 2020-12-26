
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

const mapState = (state,props) => {
    let formValues = {}
    if (state.form.stopForm) {
        formValues = state.form.stopForm.values;
    }else if (props.stop){
        formValues = props.stop;
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
    const { handleSubmit,  saveChanges, setRouteStatus } = props
    console.log("STOP FORM1", props.initialValues)


    return (
        <Segment>
            <Form onSubmit={handleSubmit(saveChanges)}>

                <div className='formOne'>
                    <Header size='small' content='Stop title' />
                    <Field
                        name='s_title'
                        component={TextInput}
                        placeholder='Stop title'
                    />
                </div>

                <div className='formOne'>
                    <Header size='small' content='Stop tags' />
                    <Field
                        name='tags'
                        component={SelectInput}
                        options={tags}
                        value='tags.text'
                        multiple={true}
                        placeholder='Tag this stop'
                    />
                </div>
                

                <div className='formOne'>
                    <Header size='small' content='Short description' />
                    <Field name="s_smallDesc" type='textarea' component={TextAreaInput} placeholder="Small description about this stop" rows={2} />
                </div>

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