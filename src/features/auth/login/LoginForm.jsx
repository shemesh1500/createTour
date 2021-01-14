import React, {useState} from "react";
import { Form, Label } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/textInput";
import { login, socialLoginFunc } from "../authActions";
import { connect } from "react-redux";
import SocialLogin from "../SocialLogin/SocialLogin";
import logo from "../../../images/loginLogo.svg";
import "../../../style/form.css";
import style from "../../../style/form.css";
import TandCWeb from '../../../images/TandCWeb.pdf'

const actions = {
  login,
  socialLoginFunc,
};

const LoginForm = ({
  login,
  handleSubmit,
  error,
  socialLoginFunc,
  changeState,
}) => {
  const [agree, setAgree] = useState(false);
  const checkboxHandler = () => {
    setAgree(!agree);
    // Don't miss the exclamation mark
  }
  return (
    <div>
      <div className="form-bg">
        <div className="loginLogo">
          {" "}
          <img src={logo} alt="smallLogo" />
        </div>
        <h1 className="mainTitle">User Login</h1>
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
            className="Inputlogin"
          />
          {error && (
            <Label basic color="red">
              {error}
            </Label>
          )}
          {/*<Button fluid size="large" color="teal">
            Login
          </Button>*/}
          <div className='agreeTAC'>
           <input type="checkbox" className="agree" onChange={checkboxHandler} />
          <div className='agreeText' htmlFor="agree"> I agree to 
          <a
              /* onClick={() => changeState("register")} */
              style={{ cursor: "pointer" }}
              href={TandCWeb}
              without rel="noopener noreferrer" target="_blank"
            >
              terms and condition
            </a></div>
          </div>
          <button type="submit" className="submitButton" disabled={!agree}>
            login
          </button>
          <div className="goToRegister">
            Still don't have acount?{" "}
            <a
              onClick={() => changeState("register")}
              style={{ cursor: "pointer" }}
              href="#"
            >
              Register here
            </a>
           
          </div>
          <a
              onClick={() => changeState("reset")}
              style={{ cursor: "pointer" }}
              href="#"
            >
              Reset password
            </a>
          <SocialLogin socialLogin={socialLoginFunc} agree={agree}/>
        </Form>
      </div>
    </div>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: "loginForm" })(LoginForm));
