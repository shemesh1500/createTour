import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react';
import TourList from '../tourList/tourList';
import TourForm from '../tourForm/tourForm';
import cuid from 'cuid';
import demoData from './demoData';


class TourDashboard extends Component {
    
    state = {
        tours: demoData,
        isOpen : false
    }
    
    setOpen = () => {
        this.setState(({isOpen}) => ({
            isOpen : !isOpen
        }))
    }

    handleCreateTour = (newTour) => {
        newTour.id = cuid();
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        newTour.c_date = date;
        this.setState(({tours}) => ({
            tours:[...tours, newTour],
            isOpen:false
        }))
    }

    render() {
        return (
            <Grid>
                <Grid.Column width={10}>
                    <TourList tours={this.state.tours}/>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Button positive content='Create Tour' onClick={this.setOpen}></Button>
                    {this.state.isOpen && <TourForm createTour={this.handleCreateTour} /> }
                </Grid.Column>
            </Grid>
        )
    }
}

export default TourDashboard;