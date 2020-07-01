import { createNewBusiness } from '../../app/common/helpers'
import { toastr } from 'react-redux-toastr';

export const createBusiness = (business) => {
    return async (dispatch, gesState, {getFirestore, getFirebase}) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        const newTour = createNewBusiness(user, business);
        try { 
            let createdTour = await firestore.add('business', newTour);
            toastr.success('Success!', 'Tour has been created');
            return createdTour;
        } catch (error) {
            console.log(error)
            toastr.error('Oops', 'Somthing went wrong!')
        }
    }
} 



export const updateBusiness = (business) => {
    return async (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore()
        try {
            await firestore.update(`business/${business.id}`, business)
            toastr.success('Success!', 'Tour has been updated');
        } catch (error) {
            console.log(error)
            toastr.error('Oops', 'Somthing went wrong!')
        }
    }
}