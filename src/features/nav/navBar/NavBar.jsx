import React, { Component } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link , withRouter} from 'react-router-dom';
import SignedOutMenu from '../menu/signedOutMenu';
import SignedInMenu from '../menu/signedInMenu';
import { openModal } from '../../modals/modalActions';
import { connect } from 'react-redux';
import { logout } from '../../auth/authActions'

const actions = {
  openModal,
  logout
}

const mapState = (state) =>  ({
  auth : state.auth
})

class NavBar extends Component {

  handleSignIn = () => this.props.openModal('LoginModal')
  handleRegister = () => this.props.openModal('RegisterModal')


  handleSignOut = () => {
    this.props.logout()
    this.props.history.push('/');
  }

    render() {
      const {auth} = this.props
        return (
                  <Menu inverted fixed="top">
                    <Container>
                      <Menu.Item as={NavLink} exact to='/' header>
                        <img src="assets/logo.png" alt="logo" />
                        D-Guide
                      </Menu.Item >
                      <Menu.Item as={NavLink} exact to='/tours' name="tours" />
                      <Menu.Item as={NavLink} to='/test' name="test" />
                      <Menu.Item>
                        <Button as={Link} to='/createTour' floated="right" positive inverted content="Create Event" />
                      </Menu.Item>
                      {auth.authenticated ? 
                      <SignedInMenu signOut={this.handleSignOut} currentUser={auth.currentUser} /> : 
                      <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister} />}
                    </Container>
                  </Menu>
        )
    }
}

export default withRouter( connect(mapState, actions)(NavBar) );