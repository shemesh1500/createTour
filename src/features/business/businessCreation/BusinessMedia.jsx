import React, { Fragment, useState } from 'react'
import { withFirestore } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PhotoComponent from './PhotoComponent';
import { toastr } from 'react-redux-toastr';
import { deleteFile } from '../../media/mediaActions';
import VideoComponent from '../../tour/tourCreation/media/VideoComponent';
import AudioComponent from '../../tour/tourCreation/media/AudioComponent';
import MediaList from '../../media/MediaList';

const actions = {
    deleteFile
}

const mapState = (state) => {
    return {
        firestore: state.firestore,
        initialValues: state.form.businessForm.values,
        loading: state.async.loading
    }
}

const BusinessMedia = (props) => {
    const { initialValues, saveChanges, loading, deleteFile } = props;

    const [photoOpen, setPhotoModal] = useState(false)
    const [videoOpen, setVideoModal] = useState(false)
    const [audioOpen, setAudioModal] = useState(false)
    let all_media = initialValues.all_media ? initialValues.all_media : []

    const handleDeleteFile = async (file) => {
        try {
            await deleteFile(file, initialValues, 'business')
        } catch (error) {
            toastr.error('Oops', error.message)
        }
    }

    const handleSetMainFile = async (photo, stop) => {
        try {
            props.change('mainMedia', photo)
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
            <button className='addButton' onClick={() => setVideoModal(true)}>+ Video</button>
            <button className='addButton' onClick={() => setAudioModal(true)}>+ Audio</button>
            {!initialValues.id && <h1>Please fill business details before</h1>}
            {initialValues.id &&
                <PhotoComponent
                    loading={loading}
                    objectId={initialValues.id}
                    all_media={all_media}
                    handleSetMainFile={handleSetMainFile}
                    handleDeletePhoto={handleDeleteFile}
                    open={photoOpen}
                    onClose={() => setPhotoModal(false)}
                />
            }
            {initialValues.id &&
                <VideoComponent
                    open={videoOpen}
                    onClose={() => setVideoModal(false)}
                    objectId={initialValues.id}
                    all_media={all_media}
                    collectionName={'business'}
                    handleDeleteFile={handleDeleteFile}
                />
            }
            {initialValues.id &&
                <AudioComponent
                    open={audioOpen}
                    onClose={() => setAudioModal(false)}
                    objectId={initialValues.id}
                    all_media={all_media}
                    collectionName={'business'}
                    handleDeleteFile={handleDeleteFile}
                />
            }
            {initialValues.all_media && <MediaList listItems={initialValues.all_media} setMediaList={setMediaList} />}
            <button className='saveButton' onClick={() => saveChanges(initialValues)}>Save changes</button>
        </Fragment >
    )
}

export default withFirestore(connect(
    mapState,
    actions
)(reduxForm({
    form: 'businessForm',
    //validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(BusinessMedia)));
