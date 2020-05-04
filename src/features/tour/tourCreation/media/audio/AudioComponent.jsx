import React, { useState, useEffect, Fragment } from 'react';
import { Segment, Header, Divider, Grid, Button, Card, Image, Form } from 'semantic-ui-react';
import DropzoneInput from '../video/DropzoneInput';
import { deleteVideo, setMainPhoto, uploadAudio } from '../../../tourAction'
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';

const query = ({ tour }) => {
    return [
        {
            collection: 'tours',
            doc: tour.id
        }
    ]
}

const actions = {
    uploadAudio,
    deleteVideo,
    setMainPhoto
}

const mapState = (state) => ({
    loading: state.async.loading
})

const AudioComponent = ({ tour, uploadAudio, deleteVideo, loading }) => {
    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview))
        }
    }, [files])


    const handleUploadAudio = async (tour) => {
        try {
            await uploadAudio(files[0].file, `${tour.id}/mediaTour/`, tour, title)
            handleCancleCrop();
            toastr.success('Success', 'Photo has been uploaded');
        } catch (error) {
            console.log(error)
            toastr.error('Oops', 'Somethingwent wrong')
        }
    }

    const handleCancleCrop = () => {
        setFiles([]);
        setTitle("")
    }

    const handleDeleteVideo = async (video, tour) => {
        try {
            await deleteVideo(video, tour)
        } catch (error) {
            toastr.error('Oops', error.message)
        }
    }

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }

    const handleSetMainPhoto = async (photo, tour) => {
        try {
            await setMainPhoto(photo, tour);
        } catch (error) {
            toastr.error('Oops', error.message);
        }
    }
    const tour_video =tour.tour_media && tour.tour_media.filter(media => media.type.includes('audio'))
    return (
        <Segment>
            <Header dividing size='large' content='Your Audio' />
            <Grid>
                <Grid.Row />
                <Grid.Column width={4}>
                    <Header color='teal' sub content='Step 1 - Add Audio' />
                    <DropzoneInput setFiles={setFiles} acceptedFile='audio/*' />
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={6}>
                    <Header sub color='teal' content='Step 2 - Preview audio' />
                    {files.length > 0 &&
                        <audio width="320" height="240" controls  >
                            <source src={files[0].preview} type={files[0].type} />
                        </audio>
                    }
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub color='teal' content='Step 3 - choose a title and approve' />
                    {files.length > 0 && (
                        <Fragment>
                            <Form.Field>
                                <input
                                    placeholder='Audio title'
                                    onChange={e => handleTitle(e)}
                                    type='text'
                                />
                            </Form.Field>
                            <Button
                                    loading={loading}
                                    onClick={() => handleUploadAudio(tour)}
                                    style={{ width: '100px' }}
                                    positive
                                    icon='check'
                                />
                                <Button
                                    disabled={loading}
                                    onClick={handleCancleCrop}
                                    style={{ width: '100px' }}
                                    icon='close'
                                />
                        </Fragment>
                    )}
                </Grid.Column>
            </Grid>
            <Divider />
            <Card.Group itemsPerRow={5}>
                {tour.profile_pic && <Card>
                    <Image src={tour.profile_pic.url || '/assets/user.png'} />
                    <Button positive>Main Photo</Button>
                </Card>}
                {tour_video && tour_video.map(video => (
                    <Fragment>
                        <Card key={video.name}>
                            <video poster={video.poster} width="260" hight="180" controls>
                                <source src={video.url} type={video.type} />
                            </video>
                            <div className='ui two buttons'>
                                <Button onClick={() => handleSetMainPhoto(video, tour)} basic color='green'>Main</Button>
                                <Button onClick={() => handleDeleteVideo(video, tour)} basic icon='trash' color='red' />
                            </div>
                        </Card>
                    </Fragment>
                ))}

            </Card.Group>
        </Segment>
    );

}

export default compose(
    connect(mapState, actions),
    firestoreConnect((tour) => query(tour))
)(AudioComponent);