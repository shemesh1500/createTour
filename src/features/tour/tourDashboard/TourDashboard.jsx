import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import TourList from '../tourList/tourList';
import { createTour, updateTour, deleteTour } from '../tourAction';
import LoadingCompanent from '../../layout/LoadingCompanent';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const query = (props) => {

    return [{
        collection: 'tours',
        where: ['tourOwner', '==', props.auth.uid]
    }]
}

const mapState = (state) => ({
    tours: state.firestore.ordered.tours,
    loading: state.async.loading,
    profile: state.firebase.profile,
    auth: state.firebase.auth
})

const actions = {
    createTour,
    updateTour,
    deleteTour
}

class TourDashboard extends Component {

    async componentDidMount() {

    }


    handleDeleteTour = (id) => {
        this.props.deleteTour(id)
    }

    handleSelectTour = (tour) => {
        this.setState({
            selectedTour: tour,
            isOpen: true
        })
    }

    render() {
        if (this.props.loading) return <LoadingCompanent />
        return (
            <Grid>
                <Grid.Column width={10}>
                    <TourList
                        tours={this.props.tours}
                        deleteTour={this.handleDeleteTour} />
                </Grid.Column>
                <Grid.Column width={6}>

                </Grid.Column>
            </Grid>
        )
    }
}


export default compose(
    connect(mapState, actions),
    firestoreConnect(props => query(props)),
)(TourDashboard);
/*
export default connect(
    mapState,
    actions
)(firestoreConnect([{ collection: 'tours',  }])(TourDashboard));
*/