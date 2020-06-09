import React from 'react';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/textInput';
import { login, socialLogin } from '../authActions';
import { connect } from 'react-redux';
import SocialLogin from '../SocialLogin/SocialLogin'
import '../../../style/form.css'
import style from '../../../style/form.css'

const actions = {
    login,
    socialLogin
}

const LoginForm = ({ login, handleSubmit, error, socialLogin, changeState }) => {
    return (
        <div>
            <div className='form-bg'>
                <h1 className="mainTitle" >User Login</h1>
                <Divider horizontal></Divider>
                <Form size="large" onSubmit={handleSubmit(login)}>

                    <Field
                        name="email"
                        component={TextInput}
                        type="text"
                        placeholder="Email Address"
                        className={style.Inputlogin}
                    />
                    <Field
                        name="password"
                        component={TextInput}
                        type="password"
                        placeholder="password"
                        className='Inputlogin'
                    />
                    {error && <Label basic color='red'>{error}</Label>}
                    <Button fluid size="large" color="teal">
                        Login
                </Button>
                    <Divider horizontal>Or</Divider>
                    <SocialLogin socialLogin={socialLogin} />
                    <Divider horizontal></Divider>
                    <Divider horizontal>Don't have an acount</Divider>
                    <button className='changRegister' onClick={() => changeState('register')}>Register</button>
                </Form>
                
            </div>
        </div>
    );
};

export default connect(null, actions)(reduxForm({ form: 'loginForm' })(LoginForm));