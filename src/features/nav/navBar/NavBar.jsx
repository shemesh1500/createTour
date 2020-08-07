import React, { Component } from "react";
import { Menu, Container } from "semantic-ui-react";
import { withFirebase } from "react-redux-firebase";
import { NavLink, withRouter } from "react-router-dom";
import SignedInMenu from "../menu/signedInMenu";
import { openModal } from "../../modals/modalActions";
import { connect } from "react-redux";
import { CheckType } from "../../auth/authActions.js";
import menuLogo from "../../../images/menuLogo.svg";
import homeIcon from "../../../images/homePageIcon.svg";
import tourIcon from "../../../images/createTourIcon.svg";
import assetsIcon from "../../../images/myAssetsIcon.svg";
import businessIcon from "../../../images/businessIcon.svg";
import balanceIcon from "../../../images/myBalanceIcon.svg";
import "../../../style/mainNavBar.css";

const actions = {
  openModal,
};

const mapState = (state) => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth,
});

class NavBar extends Component {
  handleSignIn = () => this.props.openModal("LoginModal");
  handleRegister = () => this.props.openModal("RegisterModal");

  state = { activeItem: "Home page" };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push("/");
  };

  render() {
    const { profile, auth } = this.props;
    const { activeItem } = this.state;
    const firstName = profile.displayName
      ? profile.displayName.split(" ")[0]
      : "New Guide";
    return (
      <div className="menuText">
        <Menu inverted vertical fixed="left">
          <Container>
            <Menu.Item as={NavLink} exact to="/" header>
              <div className="topMenu">
                <img className="menuLogo" src={menuLogo} alt="logo" />
                <div className="menuPersonalInfo">
                  <div className="menuName">{firstName}</div>
                  <div className="menuEmail">
                    {auth.email ? auth.email : "fix@it.com"}
                  </div>
                  <div className="logoutMenu">
                    <a
                      onClick={() => this.handleSignOut}
                      style={{ cursor: "pointer" }}
                    >
                      Log out
                    </a>
                  </div>
                </div>
              </div>
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              exact
              to="/main"
              name="Home page"
              active={activeItem === "Home page"}
              onClick={this.handleItemClick}
            >
              <img className="menuIcon" src={homeIcon} />
              Home
            </Menu.Item>

            <Menu.Item
              as={NavLink}
              exact
              to="/tours"
              name="My tours"
              active={activeItem === "My tours"}
              onClick={this.handleItemClick}
            >
              <img className="menuIcon" src={assetsIcon} />
              My assets
            </Menu.Item>

            <Menu.Item
              as={NavLink}
              exact
              to="/tourControl"
              name="Create tour"
              active={activeItem === "Create tour"}
              onClick={this.handleItemClick}
            >
              <img className="menuIcon" src={tourIcon} />
              Create tour
            </Menu.Item>

            <Menu.Item
              as={NavLink}
              exact
              to="/businessCreation"
              name="Create Business point"
              active={activeItem === "Create Business point"}
              onClick={this.handleItemClick}
            >
              <img className="menuIcon" src={businessIcon} />
              Create business stop
            </Menu.Item>

            <Menu.Item
              as={NavLink}
              exact
              to="/tours"
              name="My assets"
              active={activeItem === "My assets"}
              onClick={this.handleItemClick}
            >
              <img className="menuIcon" src={balanceIcon} />
              Cash register
            </Menu.Item>

            {CheckType() && (
              <Menu.Item
                as={NavLink}
                exact
                to="/Manage"
                name="Manage"
                active={activeItem === "Manage"}
                onClick={this.handleItemClick}
              />
            )}

            <footer>
              <SignedInMenu
                floated="button"
                signOut={this.handleSignOut}
                profile={profile}
              />
            </footer>
          </Container>
        </Menu>
      </div>
    );
  }
}

export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));
