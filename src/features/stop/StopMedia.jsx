import React, { Fragment, useState } from 'react'
import { Grid, Button } from 'semantic-ui-react';
import PhotoPage from './media/PhotoComponent';
//import VideoPage from './video/VideoPage';
//import AudioComponent from './audio/AudioComponent';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import VideoComponent from './media/VideoComponent';
import VoiceComponent from './media/VoiceComponent';
import MediaList from './media/MediaList';

const mapState = (state) => {
    return{
        initialValues: state.form.stopForm.values
    }
}


const MediaUpload = (props) => {
    const [mediaType, setMediaType] = useState('map');
    const {initialValues, saveChanges } = props;
    const switchRenderFunction = (tagName) => {
        switch (tagName) {
            case 'image':
                return <PhotoPage  />;
            case 'video':
                return <VideoComponent />;
            case 'audio':
                return <VoiceComponent />;
            default:
                break;
        }
    }
    const setMediaList = (updatedList) => {
        updatedList.map((item, index) => item.order = index)
        props.change('all_media', updatedList)
    }
    const confirmChanges = () => {
        saveChanges(initialValues);
    }
  

    console.log("props", props)
    return (
        <Fragment>
            <Grid>
                <Grid.Column width={4}>
                    <Button content="Image" onClick={() => setMediaType('image')} />
                    <Button content="Video" onClick={() => setMediaType('video')} />
                    <Button content="Audio" onClick={() => setMediaType('audio')} />
                    {initialValues.all_media && <MediaList listItems={initialValues.all_media} setMediaList={setMediaList} />}
                    <Button content="Save changes" onClick={() => saveChanges(initialValues)} />
                </Grid.Column>
                <Grid.Column width={12}>
                    {switchRenderFunction(mediaType)}
                </Grid.Column>
            </Grid>

        </Fragment >
    )
}

export default connect(mapState)(reduxForm({
    form: 'stopForm',
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(MediaUpload));
