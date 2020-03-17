import React from 'react'
import { Grid } from 'semantic-ui-react';
import TourDetailedHeader from './tourDetailedHeader';
import TourDetailedInfo from './tourDetailedInfo';
import { connect } from 'react-redux';

const mapState = (state, ownProps) => {
    const tourId = ownProps.match.params.id;
    
    let tour = {};
    if (tourId && state.tours.length > 0) {
        tour = state.tours.filter(tour => tour.id === tourId)[0];
    }
    
    return {
        tour
    }
}

const tourDetailedPage = ({tour}) => {
    return (
        <Grid>
            <Grid.Column width={6}>
                <TourDetailedHeader tour={tour}/>
            </Grid.Column>
            <Grid.Column width={10}>
                <TourDetailedInfo tour={tour}/>
            </Grid.Column>
        </Grid>
    )
}

export default connect(mapState)(tourDetailedPage);