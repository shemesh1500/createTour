import React, { Fragment, useState, useEffect } from 'react'
import { Grid, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import VideoComponent from './media/VideoComponent';
import PhotoComponent from './media/PhotoComponent';
import AudioComponent from './media/AudioComponent';
import { deleteFile } from '../../media/mediaActions'
import { setMainPhoto } from '../tourAction';
import { toastr } from 'react-redux-toastr';
import MediaList from '../../media/MediaList';

//import MediaList from './media/MediaList';

const actions = {
    deleteFile,
    setMainPhoto
}

const mapState = (state) => {
    return {
        firestore: state.firestore,
        initialValues: state.form.tourForm.values,
        loading: state.async.loading
    }
}
 

const TourMedia = (props) => {
    const { initialValues, saveChanges, loading,  deleteFile, setMainPhoto } = props;

    const [photoOpen, setPhotoModal] = useState(false)
    const [videoOpen, setVideoModal] = useState(false)
    const [audioOpen, setAudioModal] = useState(false)

    let all_media = initialValues.all_media ? initialValues.all_media : []

    const handleDeleteFile = async (file) => {
        try {
            await deleteFile(file, initialValues, 'tours')
        } catch (error) {
            toastr.error('Oops', error.message)
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
        props.change('all_media', updatedList)
    }
    const confirmChanges = () => {
        saveChanges(initialValues);
    }
    
    return (
        <Fragment>
            <Button content='Photos' onClick={() => setPhotoModal(true)} />
            <Button content='Video' onClick={() => setVideoModal(true)} />
            <Button content='Audio' onClick={() => setAudioModal(true)} />

            <PhotoComponent
                loading={loading}
                objectId={initialValues.id}
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
                collectionName={'tours'}
                handleDeleteFile={handleDeleteFile}
            />

            <AudioComponent
                open={audioOpen}
                onClose={() => setAudioModal(false)}
                objectId={initialValues.id}
                all_media={all_media}
                collectionName={'tours'}
                handleDeleteFile={handleDeleteFile}
            />

            <Button content="Save changes" onClick={() => saveChanges(initialValues)} />
            {initialValues.all_media && <MediaList listItems={initialValues.all_media} setMediaList={setMediaList} />}
        </Fragment >
    )
}

export default connect(mapState, actions)(reduxForm({
    form: 'tourForm',
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(TourMedia));
