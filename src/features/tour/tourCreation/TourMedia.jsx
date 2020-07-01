import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import VideoComponent from './media/VideoComponent';
import PhotoComponent from './media/PhotoComponent';
import AudioComponent from './media/AudioComponent';
import { deleteFile } from '../../media/mediaActions'
import { setMainPhoto } from '../tourAction';
import { toastr } from 'react-redux-toastr';
import MediaList from '../../media/MediaList';

import '../../../style/media.css'

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
    
    return (
        <Fragment>
            <button className='addButton' onClick={() => setPhotoModal(true)}>+  Photo</button> 
            <button className='addButton'  onClick={() => setVideoModal(true)}>+ Video</button>
            <button className='addButton' onClick={() => setAudioModal(true)}>+ Audio</button> 

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
            
            {initialValues.all_media && <MediaList listItems={initialValues.all_media} setMediaList={setMediaList} />}
            <button className='saveButton' onClick={() => saveChanges(initialValues)}>Save changes</button>
        </Fragment >
    )
}

export default connect(mapState, actions)(reduxForm({
    form: 'tourForm',
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(TourMedia));
