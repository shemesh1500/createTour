import React from 'react'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './businessStyle.css'
import BusinessItem from './BusinessItem';

const query = (props) => {
    return [{
        collection: 'business',
    }]
}

const actions = {

}

const mapState = (state) => ({
    business: state.firestore.ordered.business
})

const AddBusinessStop = (props) => {

    props.setbusinessMarker(props.business)

    const tagByType = (item) => {
        console.log("Switch", item.type)
        if (item.type.includes('image')) {
            return <div className='imageCarousel'> <img src={item.url} /></div>;
        } else if (item.type.includes('audio')) {
            return (<audio width="320" height="240" controls  >
                <source src={item.url} type={item.type} />
            </audio>
            );
        } else if (item.type.includes('video')) {
            return (<video poster={item.poster_url} width="260" hight="180" controls>
                <source src={item.url} type={item.type} />
            </video>
            );
        }

    }

    const renderMedia = (all_media) => {
        all_media.map(media => {
            if (media.type.includes('image')) {
                return <div><img src={media.url} /></div>;
            } else if (media.type.includes('audio')) {
                return (<div><audio width="320" height="240" controls  >
                    <source src={media.url} type={media.type} />
                </audio></div>
                );
            } else if (media.type.includes('video')) {
                return (<div><video poster={media.poster_url} width="260" hight="180" controls>
                    <source src={media.url} type={media.type} />
                </video></div>
                );
            }
        })
    }

    const renderBusiness = (business) => {
        return (
            <div className='businessItem' key={business.business_number}>
                <div>
                    <h3>{business.business_name}</h3>
                    <h3>{business.location}</h3>
                    <h5>{business.business_type}</h5>
                    <h5>{business.offer_price}</h5>
                    <h5>{business.offer_in_details}</h5>
                </div>
                <div className='innerCarousel'>
                    <Carousel className='innerCarousel'>
                        {business.all_media && business.all_media.map(media => tagByType(media))}
                        {/*renderMedia(business.all_media)*/}
                    </Carousel>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div >

                {props.selectedBusiness ?
                    <BusinessItem business={props.selectedBusiness} addBusinessToRoute={props.addBusinessToRoute} /> :
                    <h2>Please peak one of the green point from the</h2>}
                {/*props.business && props.business.map(business => <BusinessItem business={business}/>)*/}
            </div>
        </div>
    )
}

export default compose(
    connect(mapState, actions),
    firestoreConnect(props => query(props))
)(AddBusinessStop)
