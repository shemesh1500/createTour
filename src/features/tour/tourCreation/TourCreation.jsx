import React, { Component, Fragment } from 'react'
import { Grid, GridRow, Button } from 'semantic-ui-react';
import TourStops from './TourStops'
import TourCreationNav from './TourCreationNav';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import TourDetailedInfo from '../tourDetailed/tourDetailedInfo';
import TourForm from './TourForm';
import MediaUpload from './media/MediaUpload';

const mapState = (state, ownProps) => {
    const tourId = ownProps.match.params.tourId;
    let tour = {}
    if (state.firestore.ordered.tours && state.firestore.ordered.tours.length > 0) {
        tour = state.firestore.ordered.tours.filter(tour => tour.id === tourId)[0] || {}
    }
    return {
        tour
    }
}


class TourCreation extends Component {
    state = {
        tabName: 'General info',
        editInfo: false
    }
    handleTabChange = (name) => this.setState({ tabName: name })
    handleEditStat = (stat) => this.setState({ editInfo: stat })
    async componentDidMount() {
        const { firestore, match } = this.props
        if (match.params.tourId) {
            await firestore.setListener(`/tours/${match.params.tourId}`)
        }
    }
    async componentWillUnmount() {
        const { firestore, match } = this.props;
        await firestore.unsetListener(`tours/${match.params.tourId}`)
      }

    switchRenderFunction(tagName, tour) {
        switch (tagName) {
            case 'General info':
                return (this.state.editInfo
                    ? <TourForm initialValues={tour} handleEditStat={this.handleEditStat} />
                    :
                    <Fragment>
                        <TourDetailedInfo tour={tour} />
                        <Button
                            content="Edit Info"
                            onClick={() => this.handleEditStat(true)}
                        />
                    </Fragment>
                )
            case 'Media':
                return <MediaUpload tour={tour} /> ;
            case 'Tour stops':
                return <TourStops />;
            default:
                break;
        }
    }

    render() {
        const { tour } = this.props
        return (
            <Grid>
                <GridRow>
                    <TourCreationNav activeTab={this.state.tabName} handleTabChange={this.handleTabChange} />
                </GridRow>
                <Grid.Column width={16} >
                    {this.switchRenderFunction(this.state.tabName, tour)}
                </Grid.Column>
            </Grid>
        )
    }
}

export default withFirestore( connect(mapState)(TourCreation))
