import React, { Component, Fragment } from 'react'
import TourListItem from './tourListItem'

class tourList extends Component {
    render() {
        return (
            <Fragment>
                {this.props.tours.map(tour => (
                    <TourListItem 
                      key={tour.id} 
                      tour={tour}  
                      deleteTour={this.props.deleteTour}/>
                ))}
            </Fragment>
        )
    }
}

export default tourList;