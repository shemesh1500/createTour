import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import '../../../style/lists.css'

const TourList = (props) => {
    return (
        <Fragment>
            <div className='allList'>
                <div className='mainHeaderList'>
                    Tours
                </div>
                <div className='allItmList'>
                    {props.tours && props.tours.map(tour => (
                        <div className='listItem' key={tour.id}>
                            <div className='itemHeader'>
                                {tour.title && tour.title}
                            </div>
                            <div className='itemAddress'>
                                {tour.location && tour.location}
                            </div>
                            <div className='itemType'>
                                {tour.type && tour.type.map(type => (<span>{type} </span>))}
                            </div>
                            <div className='itemType'>
                                Price: {tour.price && tour.price}
                            </div>
                            <div className='itemType'>
                                Number of stops: {tour.stops && tour.stops.length}
                            </div>
                            <Link to={`/tourControl/${tour.id}`}>
                                <button className='editButton'>Edit</button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    )

}

export default TourList