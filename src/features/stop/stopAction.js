import { createNewStop } from "../../app/common/helpers";
import { toastr } from "react-redux-toastr";
import cuid from "cuid";
import { asyncActionStart, asyncActionFinish, asyncActionError } from "../async/asyncActions";
import { ASYNC_ACTION_ERROR } from "../async/asyncConstants";
import { deleteStopFile, deleteStopAudio } from "../media/mediaActions";

export const addStopToTour = (stop, tourId, allStops) =>
    async (dispatch, setState, { getFirestore }) => {
        const firestore = getFirestore();
        const updatedStops = [...allStops, stop]
        try {
            await firestore.set(`tours/${tourId}`, { all_stops: updatedStops }, { merge: true })
            toastr.success('Success', 'Stop is added to tour');
        } catch (error) {
            console.log(error)
            toastr.error('Error', 'Stop not add to tour, please try agian')
        }
    }

export const createStop = (stop, tourId, stopsCount) =>
    async (dispatch, setState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        const newStop = createNewStop(user, stop, tourId, stopsCount);
        
        try {
            let created_stop = await firestore.add({
                collection: 'tours',
                doc: tourId,
                subcollections: [{ collection: 'stops' }]
            }, {
                ...newStop
            })
            //let created_stop = await firestore.add('stops', newStop);
            toastr.success('Success', 'Stop has been created.');
            return created_stop.id;
        } catch (error) {
            console.log("Error", error)
            toastr.error("Oops", "Something went wrong! Please try agian")
        }
    }

export const createStop1 = (stop, tourOwner) =>
    async (dispatch, setState, { getFirebase, getFirestore, }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        const newStop = createNewStop(user, stop, tourOwner);
        console.log("new stop", newStop)
        try {
            let created_stop = await firestore.add('stops', newStop);
            toastr.success('Success', 'Stop has been created.');
            return created_stop.id;
        } catch (error) {
            console.log("Error", error)
            toastr.error("Oops", "Something went wrong! Please try agian")
        }
    }

export const updateStop = (tourId, stop) =>
    async (dispatch, setState, { getFirestore }) => {
        console.log("update stop")
        const firestore = getFirestore()
        try {
            console.log("update stop", stop)
            //let created_stop = await firestore.update(`tours/${tourId}/stops/${stop.id}`, stop)
            let created_stop = await firestore.update({
                collection: 'tours',
                doc: tourId,
                subcollections: [{ collection: 'stops', doc: stop.id }],
            },
                stop
            );
            toastr.success('Success', 'Stop has been updated.');
            return created_stop
        } catch (error) {
            console.log(error);
            toastr.error("Oops", 'Somthing went wrong! Please try again');
        }
    }

export const updateStop1 = (stop) =>
    async (dispatch, setState, { getFirestore }) => {
        const firestore = getFirestore()
        try {
            let created_stop = await firestore.update(`stops/${stop.id}`, stop)
            toastr.success('Success', 'Stop has been updated.');
            return created_stop
        } catch (error) {
            console.log(error);
            toastr.error("Oops", 'Somthing went wrong! Please try again');
        }
    }

export const deleteStop = (stop) =>
    async (dispatch, setState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore()
        const firebase = getFirebase();
        console.log("delete stop", stop)
        try {
            //await firebase.move(`${stop.id}/stopsMedia/`, `deleted/${stop.id}/stosMedia/`)
            stop.all_media.map(media => {
                console.log("media", media, media.type)
                if (media.type.includes('image')){
                    deleteStopFile(media, stop.Id, 'stops', stop.tour_owner)
                }else if(media.type.includes('video')){
                    deleteStopVideo(media, stop)
                }else if(media.type.includes('audio')){
                    deleteStopAudio(media, stop, 'stops', stop.tour_owner)
                }
        });

       await firestore.delete({
                collection: 'tours',
                doc: stop.tour_owner,
                subcollections: [{ collection: 'stops', doc: stop.id }],
            });
        toastr.success('Success', 'Stop has been updated.');
        } catch (error) {
            console.log(error)
            toastr.error('Oops', 'Somthing went wrong! Please try again')
        }
    }

export const deleteFile = (file, stop) =>
    async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const updated_media = stop.all_media.filter(media => media.name !== file.name)
        let updated_stop = {
            ...stop,
            all_media: updated_media
        }

        try {
            dispatch(asyncActionStart);
            await firebase.deleteFile(`${stop.id}/stopMedia/${file.name}`)
            await firestore.update(`stops/${stop.id}`, updated_stop)
            toastr.success('Success', 'Delete has been success');
        } catch (error) {
            console.log(error)
            dispatch(asyncActionError)
            toastr.error("Oops", "Something went wrong, please try agian")
        }
    }

export const deleteStopVideo = (video, stop) =>
    async (dispatch, setState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const updated_media = stop.all_media.filter(media => media.name !== video.name)
        let updated_stop = {
            ...stop,
            all_media: updated_media
        }

        try {
            dispatch(asyncActionStart);
            await firebase.deleteFile(`${stop.id}/stopMedia/${video.name}`);
            await firebase.deleteFile(`${stop.id}/stopMedia/${video.poster_name}`);
            await firestore.update({
                collection: 'tours',
                doc: stop.tour_owner,
                subcollections: [{ collection: 'stops', doc: stop.id }],
            },
            updated_stop
            );
            toastr.success('Success', 'Delete video has been success');
        } catch (error) {
            console.log(error)
            dispatch(asyncActionError)
            toastr.error("Oops", "Something went wrong, please try agian")
        }

    }
export const deleteVideo = (video, stop) =>
    async (dispatch, setState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const updated_media = stop.all_media.filter(media => media.name !== video.name)
        let updated_stop = {
            ...stop,
            all_media: updated_media
        }
        try {
            dispatch(asyncActionStart);
            await firebase.deleteFile(`${stop.id}/stopMedia/${video.name}`);
            await firebase.deleteFile(`${stop.id}/stopMedia/${video.poster_name}`);
            await firestore.update(`stops/${stop.id}`, updated_stop);
            toastr.success('Success', 'Delete video has been success');
        } catch (error) {
            console.log(error)
            dispatch(asyncActionError)
            toastr.error("Oops", "Something went wrong, please try agian")
        }

    }

export const uploadVideo = (videoFile, basePath, stopId, all_media, posterImg) =>
    async (dispatch, setState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const videoName = cuid();
        const posterName = cuid();
        const videoOptions = {
            name: videoName
        }
        const posterOptions = {
            name: posterName
        }
        try {
            dispatch(asyncActionStart)
            let uploadedVideo = await firebase.uploadFile(basePath, videoFile, null, videoOptions);
            let downloadURLvideo = await uploadedVideo.uploadTaskSnapshot.ref.getDownloadURL();
            let uploadedPoster = await firebase.uploadFile(basePath, posterImg, null, posterOptions);
            let downloadURLposter = await uploadedPoster.uploadTaskSnapshot.ref.getDownloadURL();
            let new_media = {
                name: videoName,
                url: downloadURLvideo,
                type: videoFile.type,
                poster_name: posterName,
                poster_url: downloadURLposter,
                order: all_media.lenght + 1
            }
            let updated_media = [...all_media, new_media];
            await firestore.set(`stops/${stopId}`, { all_media: updated_media }, { merge: true })
            dispatch(asyncActionFinish)
            toastr.success('Success', 'Upload video has been success');
        } catch (error) {
            console.log(error)
            dispatch(asyncActionError)
            toastr.error("Oops", "Something went wrong, please try agian")
        }

    }

export const deleteAudio = (audio, stop) =>
    async (dispatch, setState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const updated_media = stop.all_media.filter(media => media.name !== audio.name)
        let updated_stop = {
            ...stop,
            all_media: updated_media
        }
        try {
            dispatch(asyncActionStart);
            await firebase.deleteFile(`${stop.id}/stopMedia/${audio.name}`);
            await firestore.update(`stops/${stop.id}`, updated_stop);
            toastr.success('Success', 'Delete audio has been success');
        } catch (error) {
            console.log(error)
            dispatch(asyncActionError)
            toastr.error("Oops", "Something went wrong, please try agian")
        }

    }

    
export const uploadAudio = (file, basePath, stopId, all_media, audioTitle) =>
    async (dispatch, setState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const fileName = cuid();
        const options = {
            name: fileName
        }

        try {
            dispatch(asyncActionStart)
            let uploadedFile = await firebase.uploadFile(basePath, file, null, options);
            let downloadedURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
            let new_media = {
                name: fileName,
                url: downloadedURL,
                type: file.type, audio_title: audioTitle,
                order: all_media.lenght + 1
            }
            let updated_media = [...all_media, new_media]
            await firestore.set(`/stops/${stopId}`, { all_media: updated_media }, { merge: true });
            dispatch(asyncActionFinish);
        } catch (error) {
            console.log(error)
            dispatch(asyncActionError)
            toastr.error("Oops", "Something went wrong, please try agian")
        }
    }

export const uploadFile = (file, basePath, stopId, all_media) =>
    async (dispatch, setState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore()
        const firebase = getFirebase();
        const fileName = cuid();
        const options = {
            name: fileName,
            generation: stopId
        };

        try {
            dispatch(asyncActionStart);
            let uploadedFile = await firebase.uploadFile(basePath, file, null, options)
            let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
            let order = all_media.lenght + 1;
            let new_media = {
                name: fileName,
                url: downloadURL,
                type: file.type,
                order: order
            }
            let updated_media = [...all_media, new_media]
            await firestore.set(`stops/${stopId}`, { all_media: updated_media }, { merge: true })
            dispatch(asyncActionFinish)
        } catch (error) {
            console.log(error)
            dispatch(asyncActionError)
            toastr.error("Oops", "File upload faild, please try agian.")
        }
    }
export const getAllStopsPoint = (tourId) =>
    async (dispatch, setState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore()
        let all_points = []
        try {
            const all_stops = await firestore.get({
                collection: 'tours',
                doc: tourId,
                subcollections: [{ collection: 'stops' }],
            }).then(response => response.forEach(stop => all_points = [...all_points, stop.data().stop_location]))
            console.log("all_pointss", all_points)
            if (all_points !== null) {
                return all_points
            } else {
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }


