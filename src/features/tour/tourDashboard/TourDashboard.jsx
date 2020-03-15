import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react';
import TourList from '../tourList/tourList';
import TourForm from '../tourForm/tourForm';
import cuid from 'cuid';
import demoData from './demoData';


class TourDashboard extends Component {
    
    state = {
        tours: demoData,
        isOpen : false,
        selectedTour: null
    }
    
    // setOpen = () => {
    //     this.setState(({isOpen}) => ({
    //         isOpen : !isOpen
    //     }))
    // }
    handleCreateFormOpen = () => {
        this.setState({
            isOpen : true,
            selectedTour : null
        })
    }

    handleFormCancle = () =>{
        this.setState({
            isOpen:false
        })
    }

    handleCreateTour = (newTour) => {
        newTour.id = cuid();
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        newTour.c_date = date+' '+time;
        this.setState(({tours}) => ({
            tours:[...tours, newTour],
            isOpen:false
        }))
    }

    handaleUpdateTour = (updatedTour) =>{
        this.setState(({tours}) => ({
            tours: tours.map(tour => {
                if (tour.id === updatedTour.id){
                    return {...updatedTour} 
                } else {
                    return tour
                }
            }),
            isOpen : false,
            selectedTour : null
        }))
    }

    handleDeleteTour = (id) =>{
        this.setState(({tours}) => ({
          tours : tours.filter(t => t.id !== id)
        }))
      }
    
    handleSelectTour = (tour) => {
        this.setState({
            selectedTour: tour,
            isOpen: true
        })
    }

    render() {
        return (
            <Grid>
                <Grid.Column width={10}>
                    <TourList tours={this.state.tours} 
                              selectTour={this.handleSelectTour}
                              deleteTour={this.handleDeleteTour}/>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Button positive content='Create Tour' onClick={this.handleCreateFormOpen}></Button>
                    {this.state.isOpen && <TourForm key={this.state.selectedTour ? this.state.selectedTour.id : 0}
                                                    createTour={this.handleCreateTour} 
                                                    cancelFormOpen={this.handleFormCancle}
                                                    selectedTour={this.state.selectedTour}
                                                    updateTour={this.handaleUpdateTour}/> }
                </Grid.Column>
            </Grid>
        )
    }
}

export default TourDashboard;