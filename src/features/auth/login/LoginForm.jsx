import React from "react";
import { Form, Label } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/textInput";
import { login, socialLoginFunc } from "../authActions";
import { connect } from "react-redux";
import SocialLogin from "../SocialLogin/SocialLogin";
import logo from "../../../images/loginLogo.svg";
import "../../../style/form.css";
import style from "../../../style/form.css";

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
          <button type="submit" className="submitButton">
            login
          </button>
          <div className="goToRegister">
            Still don't have acount?{" "}
            <a
              onClick={() => changeState("register")}
              style={{ cursor: "pointer" }}
            >
              Register here
            </a>
          </div>

          <SocialLogin socialLogin={socialLoginFunc} />
        </Form>
      </div>
    </div>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: "loginForm" })(LoginForm));
