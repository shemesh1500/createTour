import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react';
import TourDetailedHeader from './tourDetailedHeader';
import TourDetailedInfo from './tourDetailedInfo';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withFirestore } from 'react-redux-firebase';
import { toastr } from 'react-redux-toastr';

const mapState = (state, ownProps) => {
    const tourId = ownProps.match.params.id;
    let tour = {};
   
    if (state.firestore.ordered.tours && state.firestore.ordered.tours.length > 0) {
        tour = state.firestore.ordered.tours.filter(tour => tour.id === tourId)[0] || {};
        
    }
    return {
        tour
    }
}
class tourDetailedPage extends Component {
    async componentDidMount(){
        const { firestore, match, history} = this.props;
        let tour = await firestore.get(`tours/${match.params.id}`)
        if (!tour){
            history.push('/tours');
            toastr.error('Sorry', 'Event not found')
        }
    }
    render() {
        const { tour } = this.props
        return (
            <Grid>
                <Grid.Column width={6}>
                    <TourDetailedHeader tour={tour} />
                </Grid.Column>
                <Grid.Column width={10}>
                    <TourDetailedInfo tour={tour} />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Button as={Link} to={`/createStop/${tour}`} positive constent='Create Stop' />
                </Grid.Column>
            </Grid>
        )
    }
}

export default withFirestore(connect(mapState)(tourDetailedPage));