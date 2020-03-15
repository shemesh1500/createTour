import React, {Component, Fragment} from 'react';
import TourDashboard from './features/tour/tourDashboard/TourDashboard';
import NavBar from './features/nav/navBar/NavBar';
import { Container } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <Container className='main'>
          <TourDashboard  />
        </Container>
      </Fragment>
    );
  } 
}

export default App;
