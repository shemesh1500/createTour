import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoginForm from "../auth/login/LoginForm";
import RegisterForm from "../auth/register/RegisterForm";
import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";
import Index from "./index.jsx";
import PasswordReset from "../auth/PasswordReset";

const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

const HomePage = ({ auth, history }) => {
  const authenticated = auth.isLoaded && !auth.isEmpty;
  useEffect(() => {
    if (authenticated) {
      history.push("/main");
    }
  }, [auth]);

  const [status, setStatus] = useState("home");
  const [SigninStatus, setSigninStatus] = useState("login");

  const signInSwitch = () => {
    if (SigninStatus === "login") {
      return <LoginForm changeState={setSigninStatus} />;
    } else if (SigninStatus === "reset") {
      return <PasswordReset changeState={setSigninStatus} />;
    } else {
      return <RegisterForm changeState={setSigninStatus} />;
    }
  };
  const homeSwitch = () => {
    if (status === "home") {
      return <Index setStatus={setStatus} setSigninStatus={setSigninStatus} />;
    } else {
      return (
        <Grid>
          <Grid.Column width={7} className="formBG">
            {signInSwitch()}
          </Grid.Column>
          <Grid.Column width={9} className="deadZone"></Grid.Column>
        </Grid>
      );
    }
  };

  return <div id={status}>{homeSwitch()}</div>;
};

export default withFirebase(connect(mapState)(HomePage));
