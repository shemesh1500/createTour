import React, { Component } from 'react'
import { Menu, Container } from 'semantic-ui-react';
import { withFirebase } from 'react-redux-firebase'
import { NavLink, withRouter } from 'react-router-dom';
import SignedOutMenu from '../menu/signedOutMenu';
import SignedInMenu from '../menu/signedInMenu';
import { openModal } from '../../modals/modalActions';
import { connect } from 'react-redux';

const actions = {
  openModal,
}

const mapState = (state) => ({
  profile: state.firebase.profile
})

class NavBar extends Component {

  handleSignIn = () => this.props.openModal('LoginModal')
  handleRegister = () => this.props.openModal('RegisterModal')

  state = { activeItem: 'Home page' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/');
  }

  render() {
    const { profile } = this.props;
    const { activeItem } = this.state
    return (
      <Menu inverted vertical fixed="left">
        <Container>
          <Menu.Item
            as={NavLink}
            exact
            to='/'
            header
          >
            <img src="assets/logo.png" alt="logo" />

          </Menu.Item >
          <Menu.Item
            as={NavLink}
            exact
            to='/main'
            name="Home page"
            active={activeItem === 'Home page'}
            onClick={this.handleItemClick} />

          <Menu.Item
            as={NavLink}
            exact
            to='/tours'
            name="My tours"
            active={activeItem === 'My tours'}
            onClick={this.handleItemClick} />

          <Menu.Item
            as={NavLink}
            exact
            to='/tourControl'
            name="Create tour"
            active={activeItem === 'Create tour'}
            onClick={this.handleItemClick} />

          <Menu.Item
            as={NavLink}
            exact
            to='/tours'
            name="Create Business point"
            active={activeItem === 'Create Business point'}
            onClick={this.handleItemClick} />

          <Menu.Item
            as={NavLink}
            exact
            to='/tours'
            name="My balance"
            active={activeItem === 'My balance'}
            onClick={this.handleItemClick} />

          <footer>
            <SignedInMenu floated="button" signOut={this.handleSignOut} profile={profile} />
          </footer>
        </Container>
      </Menu>
    )
  }
}

export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));