import React, { Component, Fragment } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react';
import { withFirebase } from 'react-redux-firebase'
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from '../menu/signedOutMenu';
import SignedInMenu from '../menu/signedInMenu';
import { openModal } from '../../modals/modalActions';
import { connect } from 'react-redux';

const actions = {
  openModal,
}

const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
})

class NavBar extends Component {

  handleSignIn = () => this.props.openModal('LoginModal')
  handleRegister = () => this.props.openModal('RegisterModal')


  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/');
  }

  render() {
    const { auth, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item
            as={NavLink}
            exact
            to='/'
            header
          >
            <img src="assets/logo.png" alt="logo" />
                        D-Guide
           </Menu.Item >
          <Menu.Item as={NavLink} exact to='/tours' name="tours" />
          <Menu.Item as={NavLink} exact to='/stops' name="stops" />
          {authenticated &&
            <Fragment>
              <Menu.Item as={NavLink} to='/test' name="test" />
              <Menu.Item>
                <Button as={Link} to='/createTour' floated="right" positive inverted content="Create Event" />
                <Button as={Link} to='/createStop' floated="right" inverted content="Create Stop" />
              </Menu.Item>
              <Menu.Item>
                <Button
                  as={Link}
                  to='/tourCreation'
                  content='Create Tour'
                  positive
                  inverted
                />
              </Menu.Item>
            </Fragment>
          }
          {authenticated ?
            <SignedInMenu signOut={this.handleSignOut} profile={profile} /> :
            <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister} />}
        </Container>
      </Menu>
    )
  }
}

export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));