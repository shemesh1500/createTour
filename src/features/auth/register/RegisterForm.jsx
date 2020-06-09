import React from 'react';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/textInput';
import { registerUser } from '../authActions';
import { connect } from 'react-redux';
import { combineValidators, isRequired } from 'revalidate';
import SocialLogin from '../SocialLogin/SocialLogin';
import '../../../style/form.css'

const actions = {
  registerUser
}

const validate = combineValidators({
  displayName: isRequired('Display name'),
  email: isRequired('Email'),
  password: isRequired('Password')
})

const RegisterForm = ({ handleSubmit, registerUser, error, invalid, submitting, changeState }) => {
  return (
    <div>
      <div className='form-bg'>
        <h1 className="mainTitle" >Register</h1>
        <Form size="large" onSubmit={handleSubmit(registerUser)}>
            <Field
              name="displayName"
              type="text"
              component={TextInput}
              placeholder="Known As"
            />
            <Field
              name="email"
              type="text"
              component={TextInput}
              placeholder="Email"
            />
            <Field
              name="password"
              type="password"
              component={TextInput}
              placeholder="Password"
            />
            <Field
              name="First_name"
              type="text"
              component={TextInput}
              placeholder="First name"
            />
            <Field
              name="Last_name"
              type="text"
              component={TextInput}
              placeholder="Last name"
            />
            <Field
              name="Language"
              type="text"
              component={TextInput}
              placeholder="Language"
            />
            {error && <Label basic color='red'>{error}</Label>}
            <Button disabled={invalid || submitting} fluid size="large" color="teal">
              Register
          </Button>
            <Divider horizontal>Or</Divider>
            <SocialLogin />
        </Form>
        <Divider horizontal>Allready have an acount</Divider>
        <Button className='changRegister' onClick={() => changeState('login')}>Login</Button>
      </div>
    </div>
  );
};

export default connect(null, actions)(reduxForm({ form: 'registerForm', validate })(RegisterForm));