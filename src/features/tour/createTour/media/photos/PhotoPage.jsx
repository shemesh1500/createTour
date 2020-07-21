import React, { useState, useEffect, Fragment } from 'react';
import { Segment, Header, Divider, Grid, Button, Card, Image } from 'semantic-ui-react';
import DropzoneInput from './DropzoneInput';
import CropperInput from './CropperInput';
import { uploadImage, deletePhoto, setMainPhoto } from '../../../tourAction'
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
    uploadImage,
    deletePhoto,
    setMainPhoto
}

const mapState = (state) => ({
    loading: state.async.loading
})

const PhotosPage = ({ tour, uploadImage, photos, profile, deletePhoto, setMainPhoto, loading }) => {
    const [files, setFiles] = useState([]);
    const [image, setImage] = useState(null);

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    const handleUploadImage = async (tour) => {
        try {
            console.log("image obj", image, files[0])
            await uploadImage(image, files[0].name, `${tour.id}/mediaTour/`, tour)
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
    }

    const handleDeletePhoto = async (photo, tour) => {
        try {
            await deletePhoto(photo, tour)
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

    const all_picture = tour.tour_media ? tour.tour_media.filter(media => media.type.includes('image')) : []
    return (
        <Segment>
            <Header dividing size='large' content='Your Photos' />
            <Grid>
                <Grid.Row />
                <Grid.Column width={4}>
                    <Header color='teal' sub content='Step 1 - Add Photo' />
                    <DropzoneInput setFiles={setFiles} />
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub color='teal' content='Step 2 - Resize image' />
                    {files.length > 0 &&
                        <CropperInput setImage={setImage} imagePreview={files[0].preview} />
                    }
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                    <Header sub color='teal' content='Step 3 - Preview & Upload' />
                    {files.length > 0 && (
                        <Fragment>
                            <div
                                className='img-preview'
                                style={{ minWidth: 200, minHeight: 200, overflow: 'hidden' }}
                            />
                            <Button.Group>
                                <Button
                                    loading={loading}
                                    onClick={() => handleUploadImage(tour)}
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
                    )}
                </Grid.Column>
            </Grid>
            <Divider />
            <Card.Group itemsPerRow={5}>
                {tour.profile_pic && <Card>
                    <Image src={tour.profile_pic.url || '/assets/user.png'} />
                    <Button positive>Main Photo</Button>
                </Card>}
                {all_picture.map(photo => (
                    <Card key={photo.name}>
                        <Image
                            src={photo.url}
                        />
                        <div className='ui two buttons'>
                            <Button onClick={() => handleSetMainPhoto(photo, tour)} basic color='green'>Main</Button>
                            <Button onClick={() => handleDeletePhoto(photo, tour)} basic icon='trash' color='red' />
                        </div>
                    </Card>
                ))}

            </Card.Group>
        </Segment>
    );

}

export default compose(
    connect(mapState, actions),
    firestoreConnect((tour) => query(tour))
)(PhotosPage);