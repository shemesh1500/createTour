import React, { useState, useEffect, Fragment } from 'react';
import { Image, Segment, Header, Divider, Grid, Button } from 'semantic-ui-react';
import DropzoneInput from './DropzoneInput';
import CropperInput from './CropperInput';
import { uploadProfileImage, deletePhoto, setMainPhoto } from '../../userActions'
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';
import UserPhotos from './UserPhotos';

const query = ({ auth }) => {
    return [
        {
            collection: 'users',
            doc: auth.uid,
            subcollections: [{ collection: 'photos' }],
            storeAs: 'photos'
        }
    ]
}

const actions = {
    uploadProfileImage,
    deletePhoto,
    setMainPhoto
}

const mapState = (state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    photos: state.firestore.ordered.photos,
    loading: state.async.loading
})

const PhotosPage = ({ uploadProfileImage, photos, profile, deletePhoto, setMainPhoto, loading }) => {
    const [files, setFiles] = useState([]);
    const [image, setImage] = useState(null);

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    const handleUploadImage = async () => {
        try {
            await uploadProfileImage(image, files[0].name);
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

    const handleDeletePhoto = async (photo) => {
        try {
            await deletePhoto(photo)
        } catch (error) {
            toastr.error('Oops', error.message)
        }
    }

    const handleSetMainPhoto = async (photo) => {
        try {
            await setMainPhoto(photo);
        } catch (error) {
            toastr.error('Oops', error.message);
        }
    }

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
                                    onClick={handleUploadImage}
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
            <UserPhotos photos={photos} profile={profile} deletePhoto={handleDeletePhoto} setMainPhoto={handleSetMainPhoto} />
        </Segment>
    );

}

export default compose(
    connect(mapState, actions),
    firestoreConnect(auth => query(auth))
)(PhotosPage);