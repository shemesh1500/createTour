import React, { Component } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link , withRouter} from 'react-router-dom';
import SignedOutMenu from '../menu/signedOutMenu';
import SignedInMenu from '../menu/signedInMenu';

class NavBar extends Component {
  state={
    authenticated:false
  }

  handleSignIn = () => this.setState({authenticated : true})
  handleSignOut = () => {
    this.setState({authenticated : false});
    this.props.history.push('/');
  }

    render() {
      const {authenticated} = this.state
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
                      {authenticated ? <SignedInMenu signOut={this.handleSignOut} /> : <SignedOutMenu signIn={this.handleSignIn} />}
                    </Container>
                  </Menu>
        )
    }
}

export default withRouter(NavBar);