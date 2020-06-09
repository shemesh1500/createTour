import React, { useState, useEffect } from 'react'
import { Image, Header, Container, Segment, Grid } from 'semantic-ui-react';
import LoginForm from '../auth/login/LoginForm'
import RegisterForm from '../auth/register/RegisterForm';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';

const mapState = (state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
)

const HomePage = ({ auth, history }) => {
  const authenticated = auth.isLoaded && !auth.isEmpty
  useEffect(() => {
    console.log("Effect", auth)
    if (authenticated) {
      history.push('/main')
    }
  }, [auth])


  const [status, setStatus] = useState("login")

  const signInSwitch = () => {
    console.log("switch")
    if (status === 'login') {
      console.log("LoginForm")
      return <LoginForm changeState={setStatus} />
    } else {
      console.log("RegisterForm")
      return <RegisterForm changeState={setStatus} />
    }
  }
  return (
    <div id={status}>
      <Grid>
        <Grid.Column width={7} className='formBG'>
          {signInSwitch()}
        </Grid.Column>
        <Grid.Column width={9} className='deadZone'>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default withFirebase(connect(mapState)(HomePage));