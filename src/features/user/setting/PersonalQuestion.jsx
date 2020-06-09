import React, { Component } from 'react';
import { Segment, Form, Header, Divider, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from "../../../app/common/form/textInput";
import { connect } from 'react-redux';

/*
const mapState = (state) => ({
    initialValues: state.form.userProfile.values
})
*/

const PersonalQuestion = ({pristine, submitting, handleSubmit, updateProfile}) => {

        return (
            <Segment>
                <Form onSubmit={handleSubmit(updateProfile)}>
                    <Header dividing size='small' content='When do you start to guide an why?' />
                    <Field
                        width={8}
                        name='question1'
                        type='text'
                        component={TextInput}
                        placeholder='Answer'
                    />
                    <Header dividing size='small' content='When do you start to guide an why?' />
                    <Field
                        width={8}
                        name='question2'
                        type='text'
                        component={TextInput}
                        placeholder='Answer'
                    />
                    <Header dividing size='small' content='When do you start to guide an why?' />
                    <Field
                        width={8}
                        name='question3'
                        type='text'
                        component={TextInput}
                        placeholder='Answer'
                    />
                    <Divider />
                    <Button disabled={pristine || submitting} size='large' positive content='Update Profile' />
                </Form>
            </Segment>
        );
    
}

export default reduxForm({ form: 'userProfile', enableReinitialize: true, destroyOnUnmount: false, forceUnregisterOnUnmount: true, })(PersonalQuestion);