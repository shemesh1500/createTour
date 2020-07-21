import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createTour, updateTour, deleteTour } from '../tourAction';
import LoadingCompanent from '../../layout/LoadingCompanent';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import BusinessList from '../../business/businessList/BusinessList';
import TourList from '../tourList/TourList';

const query = (props) => {

    return [{
        collection: 'tours',
        where: ['tour_guide.id', '==', props.auth.uid]
    },
    {
        collection: 'business',
        where: ['tourOwner', '==', props.auth.uid]
    }]
}

const mapState = (state) => ({
    tours: state.firestore.ordered.tours,
    business: state.firestore.ordered.business,
    loading: state.async.loading,
    profile: state.firebase.profile,
    auth: state.firebase.auth
})

const actions = {
    createTour,
    updateTour,
    deleteTour
}
const TourDashboard = (props) => {
    const handleDeleteTour = (id) => {
        this.props.deleteTour(id)
    }

    const handleSelectTour = (tour) => {
        this.setState({
            selectedTour: tour,
            isOpen: true
        })
    }


    return (
        <Grid>
            <Grid.Column width={8}>
                {props.tours && <TourList tours={props.tours} />}
            </Grid.Column>
            <Grid.Column width={8}>
                {props.business && <BusinessList business={props.business} />}
            </Grid.Column>
        </Grid>
    )
}
/*
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
        console.log("business", this.props.business);
        if (this.props.loading) return <LoadingCompanent />
        return (
            <Grid>
                <Grid.Column width={10}>
                    {false && <TourList
                        tours={this.props.tours}
                        deleteTour={this.handleDeleteTour} />}
                        
                    {this.props.tours && <TourList1 tours={this.props.tours} />}
                    {this.props.business && <BusinessList business={this.props.business} />}
                </Grid.Column>
                <Grid.Column width={6}>

                </Grid.Column>
            </Grid>
        )
    }
}
*/

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