import React, { Fragment, useState } from 'react'
import { Grid,  Button } from 'semantic-ui-react';
import PhotoPage from './photos/PhotoPage';
import VideoPage from './video/VideoPage';
import AudioComponent from './audio/AudioComponent';



const MediaUpload = ({ tour }) => {
    const [mediaType, setMediaType] = useState('map');

    const switchRenderFunction = (tagName, tour) => {
        switch (tagName) {
            case 'map':
                return <div>Map</div> ;
            case 'image':
                return <PhotoPage tour={tour} />;
            case 'video':
                return <VideoPage tour ={tour} />;
            case 'audio':
                    return <AudioComponent tour ={tour} />;
            default:
                break;
        }
    }
    return (
        <Fragment>
            <Grid>
                <Grid.Column width={4}>
                    <Button content="Image" onClick={() => setMediaType('image')} />
                    <Button content="Video" onClick={() => setMediaType('video')} />
                    <Button content="Audio" onClick={() => setMediaType('audio')} />
                </Grid.Column>
                <Grid.Column width={12}>
                {switchRenderFunction(mediaType, tour)}
            </Grid.Column>
            </Grid>
            
        </Fragment >
    )
}

export default MediaUpload
