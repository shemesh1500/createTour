import React, { useState } from "react";
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
  CheckType,
};

const mapState = (state) => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth,
});

const NavBar = (props) => {
  let [activeItem, setActiveItem] = useState("home page");

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const handleSignOut = () => {
    props.firebase.logout();
    props.history.push("/");
  };

  const { profile, auth } = props;
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
                  <span>
                    <a
                      href="1"
                      onClick={() => handleSignOut()}
                      style={{ cursor: "pointer" }}
                    >
                      Log out
                    </a>
                  </span>
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
            onClick={handleItemClick}
          >
            <img alt="home" className="menuIcon" src={homeIcon} />
            Home
          </Menu.Item>

          <Menu.Item
            as={NavLink}
            exact
            to="/tours"
            name="My tours"
            active={activeItem === "My tours"}
            onClick={handleItemClick}
          >
            <img alt="assets" className="menuIcon" src={assetsIcon} />
            My assets
          </Menu.Item>

          <Menu.Item
            as={NavLink}
            exact
            to="/tourControl"
            name="Create tour"
            active={activeItem === "Create tour"}
            onClick={handleItemClick}
          >
            <img alt="create tour" className="menuIcon" src={tourIcon} />
            Create tour
          </Menu.Item>

          <Menu.Item
            as={NavLink}
            exact
            to="/businessCreation"
            name="Create Business point"
            active={activeItem === "Create Business point"}
            onClick={handleItemClick}
          >
            <img alt="business stop" className="menuIcon" src={businessIcon} />
            Create business stop
          </Menu.Item>

          <Menu.Item
            as={NavLink}
            exact
            to="/sales"
            name="Cash register"
            active={activeItem === "Cash register"}
            onClick={handleItemClick}
          >
            <img className="menuIcon" src={balanceIcon} />
            Cash register
          </Menu.Item>

          {props.profile.userType === "rootGuide" && (
            <Menu.Item
              as={NavLink}
              exact
              to="/Manage"
              name="Manage"
              active={activeItem === "Manage"}
              onClick={handleItemClick}
            />
          )}

          <footer>
            <SignedInMenu
              floated="button"
              signOut={handleSignOut}
              profile={profile}
            />
          </footer>
        </Container>
      </Menu>
    </div>
  );
};

export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));
