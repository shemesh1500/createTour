import React from 'react'
import { useState } from 'react'
import BusinessNavBar from './businessNavBar'
import GeneralInfoForm from './GeneralInfoForm'
import { createBusiness, updateBusiness } from '../businessActions'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { reduxForm } from 'redux-form'
import OfferForm from './OfferForm'
import BusinessMedia from './BusinessMedia'

const query = (props) => {
    let businessId;
    if (props.businessId) {
        businessId = props.businessId
    }
    else if (props.initialValues && props.initialValues.businessId) {
        businessId = props.initialValues.businessId
    }
    if (businessId) {
        return [
            { collection: 'business' }
        ]
    } else {
        return [
            { collection: 'business' }
        ]
    }
}

const actions = {
    createBusiness,
    updateBusiness
}
const mapState = (state, ownProps) => {
    let businessId;
    
    if (ownProps.match.params.businessId) {
        businessId = ownProps.match.params.businessId;
    } else if (state.form && state.form.businessForm && state.form.businessForm.values.id) {
        businessId = state.form.businessForm.values.id
    }

    let business = {}
    if (state.firestore.ordered.business && state.firestore.ordered.business.length > 0) {
        business = state.firestore.ordered.business.filter(business => business.id === businessId)[0] || {}
        
    }
    
    return {
        initialValues: business,
        businessId: businessId
    }
}

const BusinessCreation = (props) => {

    const [StatusNav, setStatusNav] = useState('General Info')

    const onFormSubmit = async (values) => {
        try {
            if (values.id) {
                props.updateBusiness(values)
            } else {
                let createdBusiness = await props.createBusiness(values)
                props.change('id', createdBusiness.id)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const switchContext = () => {
        switch (StatusNav) {
            case 'General Info':
                return <GeneralInfoForm onFormSubmit={onFormSubmit} />
            case 'Offer Details':
                return <OfferForm onFormSubmit={onFormSubmit}/>
            case 'Business Content':
                return <BusinessMedia saveChanges={onFormSubmit} />
            default:
                break
        }
    }

    return (
        <div className='controlArea'>
            <div className='contextArea'>
                <BusinessNavBar activeTab={StatusNav} handleTabChange={setStatusNav} />
                <div className='allForm'>

                    {switchContext()}
                </div>
            </div>
        </div>

    )
}

export default compose(
    connect(mapState, actions),
    firestoreConnect(props => query(props)),
    reduxForm(
        {
            form: 'businessForm',
            enableReinitialize: true,
            destroyOnUnmount: false,
            forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
        })
)(BusinessCreation);
