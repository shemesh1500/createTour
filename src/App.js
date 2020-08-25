import React, { Component, Fragment } from "react";
import TourDashboard from "./features/tour/tourDashboard/TourDashboard";
import NavBar from "./features/nav/navBar/NavBar";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import HomePage from "./features/home/HomePage";
import TourDetailedPage from "./features/tour/tourDetailed/tourDetailedPage";
import ModalManager from "./features/modals/modalManager";
import SettingDashboard from "./features/user/setting/SettingDashboard";
import StopCreation from "./features/stop/StopCreation";
import StopList from "./features/stop/StopList";
import TourControl from "./features/tour/tourCreation/TourControl";
import TourControlNew from "./features/tour/createTour/TourControl";
import { withFirebase } from "react-redux-firebase";
import { connect } from "react-redux";
import "./style/homePage.css";
import UserSettings from "./features/user/setting/UserSettings";
import MainPage from "./features/home/MainPage";
import BusinessCreation from "./features/business/businessCreation/BusinessCreation";
import Index from "./features/home/Index";
import HelperComponent from "./HelperComponent";
import ManageTours from "./features/tour/tourDashboard/ManageTours";
import SalesPage from "./features/user/SalesPage";
import CandT from "./features/auth/CandT";

const mapState = (state, props) => {
  return {
    path: props.location.pathname,
    auth: state.firebase.auth,
  };
};

class App extends Component {
  render() {
    const TandC = this.props.path === "/TandC" ? true : false;
    let authenticated = this.props.auth.isLoaded && !this.props.auth.isEmpty;
    return (
      <Fragment>
        <ModalManager />
        {TandC ? ((<Redirect to="/TandC" />), (authenticated = true)) : null}
        <Route exact path={"/TandC"} component={CandT} />
        {!authenticated ? <Redirect to="/" /> : null}
        <Route exact path="/" component={HomePage} />

        <Route
          path="/(.+)"
          render={() => (
            <div className="mainApp">
              <NavBar />
              <div className="switchContext">
                <Switch key={this.props.location.key}>
                  <Route path="/settings" component={UserSettings} />
                  <Route path="/settingss" component={SettingDashboard} />
                  <Route exact path="/main" component={MainPage} />
                  <Route exact path="/tours" component={TourDashboard} />
                  <Route
                    exact
                    path={[
                      "/businessCreation",
                      "/businessCreation/:businessId",
                    ]}
                    component={BusinessCreation}
                  />
                  <Route exact path="/index" component={Index} />
                  <Route exact path="/sales" component={SalesPage} />
                  <Route
                    path={["/tourControl/:tourId", "/tourControl"]}
                    component={TourControlNew}
                  />

                  <Route path="/tours/:id" component={TourDetailedPage} />
                  {/*<Route path={['/tourCreation/:tourId', '/tourCreation']} component={TourCreation} />*/}

                  <Route
                    path={[
                      "/createStop/:tourId/:stopId",
                      "/createStop/:tourId",
                      "/createStop",
                    ]}
                    component={StopCreation}
                  />
                  <Route
                    path={["/tourControlOld/:tourId", "/tourControlOld"]}
                    component={TourControl}
                  />

                  <Route path={"/stops"} component={StopList} />

                  <HelperComponent
                    path="/manage"
                    component={ManageTours}
                    requiredRole="User"
                  />
                </Switch>
              </div>
            </div>
          )}
        />
      </Fragment>
    );
  }
}

export default withRouter(withFirebase(connect(mapState)(App)));
