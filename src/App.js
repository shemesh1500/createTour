import React, {Component, Fragment} from 'react';
import TourDashboard from './features/tour/tourDashboard/TourDashboard';
import NavBar from './features/nav/navBar/NavBar';
import { Container } from 'semantic-ui-react';
import { Route, withRouter, Switch } from 'react-router-dom';
import homePage from './features/home/homePage';
import tourForm from './features/tour/tourForm/tourForm';
import TestComponent from './features/testerea/testComponent';
import TourDetailedPage from './features/tour/tourDetailed/tourDetailedPage';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path='/' component={homePage} />
        <Route path='/(.+)' render={() => (
             <Fragment>
              <NavBar />
              <Container className='main'>
                <Switch key={this.props.location.key}>  
                  <Route exact path='/tours' component={TourDashboard} />
                  <Route path='/tours/:id' component={TourDetailedPage} />
                  <Route path={['/createTour', '/manage/:id']} component={tourForm} />
                  <Route path='/test' component={TestComponent} />
                </Switch> 
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  } 
}

export default withRouter(App);
