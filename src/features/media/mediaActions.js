import cuid from "cuid";
import { asyncActionStart, asyncActionFinish, asyncActionError } from "../async/asyncActions";
import { toastr } from "react-redux-toastr";

export const uploadStopFile = (file, basePath, objectId, all_media, collectionName, tourId) =>
    async (dispatch, setState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore()
        const firebase = getFirebase();
        const fileName = cuid();
        const options = {
            name: fileName,
            generation: objectId
        };

        try {
            dispatch(asyncActionStart);
            let uploadedFile = await firebase.uploadFile(`${objectId}/${collectionName}Media/`, file, null, options)
            let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
            let order = all_media.lenght + 1;
            let new_media = {
                name: fileName,
                url: downloadURL,
                type: file.type,
                order: order
            }
            let updated_media = [...all_media, new_media]
            console.log("Upload Stop File1", tourId, objectId, updated_media )
            await firestore.set({
                collection: 'tours',
                doc: tourId,
                subcollections: [{ collection: 'stops', doc: objectId }],
            },
                { all_media: updated_media },
                { merge: true })
            dispatch(asyncActionFinish)
            toastr.success("Success", "File upload success.")
        } catch (error) {
            console.log(error)
            dispatch(asyncActionError)
            toastr.error("Oops", "File upload faild, please try agian.")
        }
    }


export const uploadFile = (file, basePath, objectId, all_media, collectionName) =>
    async (dispatch, setState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore()
        const firebase = getFirebase();
        const fileName = cuid();
        const options = {
            name: fileName,
            generation: objectId
        };

        try {
            dispatch(asyncActionStart);
            let uploadedFile = await firebase.uploadFile(`${objectId}/${collectionName}Media/`, file, null, options)
            let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
            let order = all_media.lenght + 1;
            let new_media = {
                name: fileName,
                url: downloadURL,
                type: file.type,
                order: order
            }
            let updated_media = [...all_media, new_media]
            await firestore.set(`${collectionName}/${objectId}`, { all_media: updated_media }, { merge: true })
            dispatch(asyncActionFinish)
            toastr.success("Success", "File upload success.")
        } catch (error) {
            console.log(error)
            dispatch(asyncActionError)
            toastr.error("Oops", "File upload faild, please try agian.")
        }
    }

export const deleteFile = (file, object, collection) =>
    async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const updated_media = object.all_media.filter(media => media.name !== file.name)
        let updated_object = {
            ...object,
            all_media: updated_media
        }
       
        try {
            dispatch(asyncActionStart);
            await firebase.deleteFile(`${object.id}/${collection}Media/${file.name}`)
            await firestore.update(`${collection}/${object.id}`, updated_object)
            toastr.success('Success', 'Delete has been success');
        } catch (error) {
            console.log(error)
            dispatch(asyncActionError)
            toastr.error("Oops", "Something went wrong, please try agian")
        }
    }

export const deleteStopFile = (file, object, collection, tourId) =>
    async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const updated_media = object.all_media.filter(media => media.name !== file.name)
        let updated_object = {
            ...object,
            all_media: updated_media
        }
        let stopQuery = `${collection}/${object.id}` 
        if (tourId !== null){
            stopQuery = {
                collection : 'tours',
                doc : tourId,
                subcollections : [{collection : 'stops', doc: object.id}]
            }
        }
        try {
            dispatch(asyncActionStart);
            await firebase.deleteFile(`${object.id}/${collection}Media/${file.name}`)
            await firestore.update(stopQuery,
                updated_object
            );
            toastr.success('Success', 'Delete has been success');
        } catch (error) {
            console.log(error)
            dispatch(asyncActionError)
            toastr.error("Oops", "Something went wrong, please try agian")
        }
    }

    export const deleteStopVideo = (file, object, collection, tourId) =>
    async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const updated_media = object.all_media.filter(media => media.name !== file.name)
        let updated_object = {
            ...object,
            all_media: updated_media
        }
        let stopQuery = `${collection}/${object.id}` 
        if (tourId !== null){
            stopQuery = {
                collection : 'tours',
                doc : tourId,
                subcollections : [{collection : 'stops', doc: object.id}]
            }
        }
        try {
            dispatch(asyncActionStart);
            await firebase.deleteFile(`${object.id}/${collection}Media/${file.name}`)
            await firebase.deleteFile(`${object.id}/${collection}Media/${file.poster_name}`)
            await firestore.update(stopQuery,
                updated_object
            );
            toastr.success('Success', 'Delete has been success');
        } catch (error) {
            console.log(error)
            dispatch(asyncActionError)
            toastr.error("Oops", "Something went wrong, please try agian")
        }
    }

export const uploadVideo = (videoFile, basePath, objectId, all_media, posterImg, collectionName) =>
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
            await firestore.set(`${collectionName}/${objectId}`, { all_media: updated_media }, { merge: true })
            dispatch(asyncActionFinish)
            toastr.success('Success', 'Upload video has been success');
        } catch (error) {
            console.log(error)
            dispatch(asyncActionError)
            toastr.error("Oops", "Something went wrong, please try agian")
        }

    }

    export const uploadStopVideo = (videoFile, basePath, objectId, all_media, posterImg, collectionName, tourId) =>
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
        let stopQuery = `${collectionName}/${objectId}` 
        if (tourId !== null){
            stopQuery = {
                collection : 'tours',
                doc : tourId,
                subcollections : [{collection : 'stops', doc: objectId}]
            }
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
            await firestore.set(stopQuery, { all_media: updated_media }, { merge: true })
            dispatch(asyncActionFinish)
            toastr.success('Success', 'Upload video has been success');
        } catch (error) {
            console.log(error)
            dispatch(asyncActionError)
            toastr.error("Oops", "Something went wrong, please try agian")
        }

    }

export const uploadAudio = (file, basePath, objectId, all_media, audioTitle, collectionName) =>
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
            console.log("UPLOAD AUDIO2")
            let updated_media = [...all_media, new_media]
            await firestore.set(`/${collectionName}/${objectId}`, { all_media: updated_media }, { merge: true });
            console.log("UPLOAD AUDIO3")
            dispatch(asyncActionFinish);
        } catch (error) {
            console.log(error)
            dispatch(asyncActionError)
            toastr.error("Oops", "Something went wrong, please try agian")
        }
    }

    export const uploadStopAudio = (file, basePath, objectId, all_media, audioTitle, collectionName, tourId) =>
    async (dispatch, setState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const fileName = cuid();
        const options = {
            name: fileName
        }
        let stopQuery = `${collectionName}/${objectId}` 
        if (tourId !== null){
            stopQuery = {
                collection : 'tours',
                doc : tourId,
                subcollections : [{collection : 'stops', doc: objectId}]
            }
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
            await firestore.set(stopQuery, { all_media: updated_media }, { merge: true });
            dispatch(asyncActionFinish);
        } catch (error) {
            console.log(error)
            dispatch(asyncActionError)
            toastr.error("Oops", "Something went wrong, please try agian")
        }
    }

    export const deleteStopAudio = (file, object, collection, tourId) =>
    async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const updated_media = object.all_media.filter(media => media.name !== file.name)
        let updated_object = {
            ...object,
            all_media: updated_media
        }
        let stopQuery = `${collection}/${object.id}` 
        if (tourId !== null){
            stopQuery = {
                collection : 'tours',
                doc : tourId,
                subcollections : [{collection : 'stops', doc: object.id}]
            }
        }
        try {
            dispatch(asyncActionStart);
            await firebase.deleteFile(`${object.id}/${collection}Media/${file.name}`)
            await firestore.update(stopQuery,
                updated_object
            );
            toastr.success('Success', 'Delete has been success');
        } catch (error) {
            console.log(error)
            dispatch(asyncActionError)
            toastr.error("Oops", "Something went wrong, please try agian")
        }
    }    


/************************ TEXT **********************/
export const uploadStopText = (context, basePath, objectId, all_media, collectionName, tourId) =>
    async (dispatch, setState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();    
        const fileName = cuid();
        let stopQuery = `${collectionName}/${objectId}` 
        if (tourId !== null){
            stopQuery = {
                collection : 'tours',
                doc : tourId,
                subcollections : [{collection : 'stops', doc: objectId}]
            }
        }
        try {
            dispatch(asyncActionStart)
            let new_media = {
                name: fileName,
                context: context,
                type: 'text', 
                order: all_media.lenght + 1
            }
            let updated_media = [...all_media, new_media]
            await firestore.set(stopQuery, { all_media: updated_media }, { merge: true });
            dispatch(asyncActionFinish);
        } catch (error) {
            console.log(error)
            dispatch(asyncActionError)
            toastr.error("Oops", "Something went wrong, please try agian")
        }
    }

    export const deleteStopText = (file, object, collection, tourId) =>
    async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const updated_media = object.all_media.filter(media => media.name !== file.name)
        let updated_object = {
            ...object,
            all_media: updated_media
        }
        let stopQuery = `${collection}/${object.id}` 
        if (tourId !== null){
            stopQuery = {
                collection : 'tours',
                doc : tourId,
                subcollections : [{collection : 'stops', doc: object.id}]
            }
        }
        try {
            dispatch(asyncActionStart);
            await firestore.update(stopQuery,
                updated_object
            );
            toastr.success('Success', 'Delete has been success');
        } catch (error) {
            console.log(error)
            dispatch(asyncActionError)
            toastr.error("Oops", "Something went wrong, please try agian")
        }
    }  
    
/************************ Question ***********************/
export const addQuestion =(question, options, tourId, stopId, all_media) =>
async (dispatch, setState, { getFirestore}) => {
    const firestore = getFirestore()
    const name = cuid()
    const stopQuery = {
        collection: 'tours',
        doc : tourId,
        subcollections : [{collection:'stops', doc: stopId}]
    }
    try {
            const question_media = {
                name : name,
                qustion_text: question,
                options : options, 
                type: 'question'
            }
          const update_media = [...all_media, question_media]
          await firestore.set(stopQuery, {all_media: update_media}, {merge : true})
          toastr.success("Success", "Question added to stop")
    } catch (error) {
        console.log(error)
        toastr.error("Oops", "Something went wrong, please try agian")
    }
}

export const removeQuestion =(file, tourId, object) =>
async (dispatch, setState, { getFirestore}) => {
    const firestore = getFirestore()
    const update_media = object.all_media.filter(media => media.name !== file.name)
    const stopQuery = {
        collection: 'tours',
        doc : tourId,
        subcollections : [{collection:'stops', doc: object.id}]
    }
    try {
          await firestore.set(stopQuery, {all_media: update_media}, {merge : true})
          toastr.success("Success", "Question remove from stop")
    } catch (error) {
        console.log(error)
        toastr.error("Oops", "Something went wrong, please try agian")
    }
}