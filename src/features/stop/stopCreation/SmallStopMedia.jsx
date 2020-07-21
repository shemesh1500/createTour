import React, { Fragment, useState } from 'react'
import { Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PhotoComponent from '../media/PhotoComponent';
import AudioComponent from '../media/AudioComponent';
import { setMainPhoto } from '../../tour/tourAction';
import { toastr } from 'react-redux-toastr';
import TextComponent from '../media/TextComponent';
import {
    deleteStopFile,
    deleteStopText,
    removeQuestion
} from '../../media/mediaActions'

//import MediaList from './media/MediaList';

const actions = {
    deleteStopFile,
    setMainPhoto,
    deleteStopText,
    removeQuestion
}

const mapState = (state, props) => {
    console.log("state.form.smallStopForm.values", state.form.smallStopForm.values);
    let stop = {}
    if (props.stopId) {
        stop = state.firestore.ordered.stops.filter(stop => stop.id === props.stopId)[0]
    }

    console.log("stop on media", stop)
    const all_media = stop ? stop.all_media : []
    return {
        all_media: all_media,
        firestore: state.firestore,
        initialValues: state.form.smallStopForm.values,
        loading: state.async.loading
    }
}


const SmallStopMedia = (props) => {
    const {
        initialValues,
        saveChanges,
        loading,
        deleteStopFile,
        setMainPhoto,
        tourId,
        all_media,
        deleteStopText,
        removeQuestion
    } = props;

    const [photoOpen, setPhotoModal] = useState(false)
    const [audioOpen, setAudioModal] = useState(false)
    const [textOpen, setTextModal] = useState(false)
    //let all_media = initialValues.all_media ? initialValues.all_media : []

    const handleDeleteFile = async (file) => {
        try {
            await deleteStopFile(file, initialValues, 'stops', tourId)
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

    const tagByType = (item) => {
        if (item.type.includes('image')) {
            return <Image src={item.url} />;
        } else if (item.type.includes('audio')) {
            return (
                <audio preload="auto" id="id12" controls="controls" onended="func12();" src={item.url}></audio>
            );
        } else if (item.type.includes('video')) {
            return (<video poster={item.poster_url} width="180" hight="120" controls>
                <source src={item.url} type={item.type} />
            </video>
            );
        }

    }

    console.log("media small", initialValues.all_media.length === 0);

    return (
        <Fragment>
            {initialValues.all_media.length === 0 &&
                <div>
                    <button className='addButton' onClick={() => setPhotoModal(true)}>+  Photo</button>
                    <button className='addButton' onClick={() => setAudioModal(true)}>+  Audio</button>
                    <button className='addButton' onClick={() => setTextModal(true)}>+  Text</button>
                </div>
            }

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


            {initialValues.all_media && initialValues.all_media[0] &&
                tagByType(initialValues.all_media[0])
            }
            {initialValues.all_media && initialValues.all_media[0] &&
                <div>
                    <button className='saveButton' onClick={() => handleDeleteFile(initialValues.all_media[0])}>Change context</button>
                </div>
            }
            <button className='saveButton' onClick={() => saveChanges(initialValues)}>Save changes</button>
        </Fragment >
    )
}

export default connect(mapState, actions)(reduxForm({
    form: 'smallStopForm',
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(SmallStopMedia));
