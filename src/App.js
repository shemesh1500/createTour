import React, { Component, Fragment } from 'react';
import TourDashboard from './features/tour/tourDashboard/TourDashboard';
import NavBar from './features/nav/navBar/NavBar';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import TourDetailedPage from './features/tour/tourDetailed/tourDetailedPage';
import ModalManager from './features/modals/modalManager';
import SettingDashboard from './features/user/setting/SettingDashboard'
import TourCreation from './features/tour/tourCreation/TourCreation';
import StopCreation from './features/stop/StopCreation';
import StopList from './features/stop/StopList';
import TourControl from './features/tour/tourCreation/TourControl';
import TourControlNew from './features/tour/createTour/TourControl';
import { withFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux';
import './style/homePage.css'
import UserSettings from './features/user/setting/UserSettings';
import MainPage from './features/home/MainPage';
import BusinessCreation from './features/business/businessCreation/BusinessCreation';
import Index from './features/home/Index';

const mapState = (state) => ({
  auth: state.firebase.auth
})

class App extends Component {
  render() {
    const authenticated = this.props.auth.isLoaded && !this.props.auth.isEmpty
    return (
      <Fragment>
        <ModalManager />
        {!authenticated ? <Redirect to="/" /> : null}
        <Route exact path='/' component={HomePage} />
        <Route path='/(.+)' render={() => (
          
          <div className='mainApp'>
            <NavBar />
            <div className='switchContext'>
              <Switch key={this.props.location.key}>
                <Route path='/settings' component={UserSettings} />
                <Route path='/settingss' component={SettingDashboard} />
                <Route exact path="/main" component={MainPage} />
                <Route exact path='/tours' component={TourDashboard} />
                <Route exact path={['/businessCreation', '/businessCreation/:businessId']} component={BusinessCreation} />
                <Route exact path='/index' component={Index} />
                <Route path={['/tourControl/:tourId', '/tourControl']} component={TourControlNew} />

                <Route path='/tours/:id' component={TourDetailedPage} />
                <Route path={['/tourCreation/:tourId', '/tourCreation']} component={TourCreation} />

                <Route path={['/createStop/:tourId/:stopId', '/createStop/:tourId', '/createStop']} component={StopCreation} />
                <Route path={['/tourControlOld/:tourId', '/tourControlOld']} component={TourControl} />
                
                
                <Route path={'/stops'} component={StopList} />
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
