import React, { Fragment, useState, useEffect } from 'react'
import { Grid, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import VideoComponent from '../media/VideoComponent';
import PhotoComponent from '../media/PhotoComponent';
import AudioComponent from '../media/AudioComponent';
import { setMainPhoto } from '../../tour/tourAction';
import { toastr } from 'react-redux-toastr';
import MediaList from '../../media/MediaList';
import TextComponent from '../media/TextComponent';
import QuestionComponent from '../media/QuestionComponent';
import {
    deleteStopFile,
    deleteStopVideo,
    deleteStopText,
    removeQuestion
} from '../../media/mediaActions'

//import MediaList from './media/MediaList';

const actions = {
    deleteStopFile,
    deleteStopVideo,
    setMainPhoto,
    deleteStopText,
    removeQuestion
}

const mapState = (state, props) => {
    const stop = state.firestore.ordered.stops.filter(stop => stop.id === state.form.stopForm.values.id)[0]
    console.log("stop on media", stop)
    const all_media = stop ? stop.all_media : []
    return {
        all_media: all_media,
        firestore: state.firestore,
        initialValues: state.form.stopForm.values,
        loading: state.async.loading
    }
}


const StopMedia = (props) => {
    const {
        initialValues,
        saveChanges,
        loading,
        deleteStopFile,
        deleteStopVideo,
        setMainPhoto,
        tourId,
        all_media,
        deleteStopText,
        removeQuestion
    } = props;

    const [photoOpen, setPhotoModal] = useState(false)
    const [videoOpen, setVideoModal] = useState(false)
    const [audioOpen, setAudioModal] = useState(false)
    const [textOpen, setTextModal] = useState(false)
    const [questionOpen, setQuestionModal] = useState(false)

    //let all_media = initialValues.all_media ? initialValues.all_media : []

    const handleDeleteFile = async (file) => {
        try {
            await deleteStopFile(file, initialValues, 'stops', tourId)
        } catch (error) {
            toastr.error('Oops', error.message)
        }
    }

    const handleDeleteVideo = (video) => {
        try {
            deleteStopVideo(video, initialValues, 'stops', tourId)
        } catch (error) {
            console.log(error);
            toastr.error('Oops', 'Somthing went wrong')
        }
    }

    const handleSetMainFile = async (photo, stop) => {
        try {
            await setMainPhoto(photo, stop);
        } catch (error) {
            toastr.error('Oops', error.message);
        }
    }

    const setMediaList = (updatedList) => {
        updatedList.map((item, index) => item.order = index)
    }
    const confirmChanges = () => {
        saveChanges(initialValues);
    }

    const deleteFuncSwitch = (file) => {
        console.log("file", file)
        switch (file.type) {
            case 'photo':
                return handleDeleteFile(file)
            case 'video':
                return handleDeleteVideo(file)
            case 'audio':
                return handleDeleteFile(file)
            case 'text':
                return deleteStopText(file, initialValues, 'stops', tourId)
            case 'question':
                return removeQuestion(file, tourId, initialValues)


            default:
                break;
        }
    }
    //console.log("all media in media", all_media)
    return (
        <Fragment> 
            <button className='addButton' onClick={() => setPhotoModal(true)}>+  Photo</button>
            <button className='addButton' onClick={() => setVideoModal(true)}>+  Video</button>
            <button className='addButton' onClick={() => setAudioModal(true)}>+  Audio</button>
            <button className='addButton' onClick={() => setTextModal(true)}>+  Text</button>
            <button className='addButton' onClick={() => setQuestionModal(true)}>+  Question</button>

            <PhotoComponent
                loading={loading}
                objectId={initialValues.id}
                tourId={tourId}
                all_media={all_media}
                handleSetMainFile={handleSetMainFile}
                handleDeletePhoto={handleDeleteFile}
                open={photoOpen}
                onClose={() => setPhotoModal(false)}
            />
            <VideoComponent
                open={videoOpen}
                onClose={() => setVideoModal(false)}
                objectId={initialValues.id}
                all_media={all_media}
                collectionName={'stops'}
                tourId={initialValues.tour_owner}
                handleDeleteFile={handleDeleteVideo}
            />

            <AudioComponent
                open={audioOpen}
                onClose={() => setAudioModal(false)}
                objectId={initialValues.id}
                tourId={initialValues.tour_owner}
                all_media={all_media}
                collectionName={'stops'}
                handleDeleteFile={handleDeleteFile}
            />

            <TextComponent
                open={textOpen}
                onClose={() => setTextModal(false)}
                objectId={initialValues.id}
                tourId={initialValues.tour_owner}
                all_media={all_media}
                collectionName={'stops'}
                handleDeleteFile={handleDeleteFile}
            />

            <QuestionComponent
                open={questionOpen}
                onClose={() => setQuestionModal(false)}
                objectId={initialValues.id}
                tourId={initialValues.tour_owner}
                all_media={all_media}
                collectionName={'stops'}
            />

            {initialValues.all_media &&
                <MediaList
                    listItems={initialValues.all_media}
                    setMediaList={setMediaList}
                    deleteFuncSwitch={deleteFuncSwitch} />}
            <button className='saveButton' onClick={() => saveChanges(initialValues)}>Save changes</button>
        </Fragment >
    )
}

export default connect(mapState, actions)(reduxForm({
    form: 'stopForm',
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(StopMedia));
