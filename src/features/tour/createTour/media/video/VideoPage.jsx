import React, { useState, useEffect, Fragment } from 'react';
import { Segment, Header, Divider, Grid, Button, Card, Image } from 'semantic-ui-react';
import DropzoneInput from './DropzoneInput';
import { deleteVideo, setMainPhoto, uploadVideo } from '../../../tourAction'
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
    uploadVideo,
    deleteVideo,
    setMainPhoto
}

const mapState = (state) => ({
    loading: state.async.loading
})

const VideoPage = ({ tour, uploadVideo, deleteVideo, setMainPhoto, loading }) => {
    const [files, setFiles] = useState([]);
    const [image, setImage] = useState(null);
    const [poster, setPoster] = useState([]);


    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview))
            poster.forEach(file => URL.revokeObjectURL(poster.preview))
        }
    }, [files, poster])


    const handleUploadVideo = async (tour) => {
        try {
            await uploadVideo(files[0].file, `${tour.id}/mediaTour/`, tour, poster[0].file)
            handleCancleCrop();
            toastr.success('Success', 'Photo has been uploaded');
        } catch (error) {
            console.log(error)
            toastr.error('Oops', 'Somethingwent wrong')
        }
    }

    const handleCancleCrop = () => {
        setFiles([]);
        setImage(null);
        setPoster([]);
    }

    const handleDeleteVideo = async (video, tour) => {
        try {
            await deleteVideo(video, tour)
        } catch (error) {
            toastr.error('Oops', error.message)
        }
    }

    const handleSetMainPhoto = async (photo, tour) => {
        try {
            await setMainPhoto(photo, tour);
        } catch (error) {
            toastr.error('Oops', error.message);
        }
    }

    let tour_video
    if (tour.tour_media){
        tour_video = tour.tour_media.filter(media => media.type.includes('video'))
    }

    const all_video = tour.tour_media ? tour.tour_media.filter(media => media.type.includes('video')) : []

    console.log("tour_video", tour_video)
    console.log("image", image)
    console.log("files", files)
    console.log('poster', poster)
    return (
        <Segment>
            <Header dividing size='large' content='Your Videos' />
            <Grid>
                <Grid.Row />
                <Grid.Column width={4}>
                    <Header color='teal' sub content='Step 1 - Add Video' />
                    <DropzoneInput setFiles={setFiles} acceptedFile='video/*' />
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={6}>
                    <Header sub color='teal' content='Step 2 - Preview video' />
                    {files.length > 0 &&
                        <video width="320" height="240" controls  >
                            <source src={files[0].preview} type={files[0].type} />
                        </video>
                    }
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub color='teal' content='Step 3 - Upload a poster picture for the video' />
                    {files.length > 0 && (
                        <Fragment>
                            {poster.length > 0 ?
                                <Fragment>
                                    <Image src={poster[0].preview} />
                                    <Button.Group>
                                        <Button
                                            loading={loading}
                                            onClick={() => handleUploadVideo(tour)}
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
                                    </Button.Group>
                                </Fragment>
                                : <DropzoneInput setFiles={setPoster} acceptedFile='image/*' />}
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
                {all_video && all_video.map(video => (
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
)(VideoPage);