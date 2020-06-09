import React, { useState, useEffect, Fragment } from 'react';
import { Segment, Header, Divider, Grid, Button, Card, Image } from 'semantic-ui-react';
import DropzoneInput from './DropzoneInput';
import CropperInput from './CropperInput';
import { setMainPhoto } from '../../tour/tourAction'
import { uploadFile, deleteFile } from '../stopAction'
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { reduxForm } from 'redux-form';

const actions = {
    deleteFile,
    setMainPhoto,
    uploadFile
}

const mapState = (state) => (
    {
        initialValiues: state.form.stopForm.values,
        loading: state.async.loading,
        stop: state.firestore.ordered[0],
        all_media : state.form.stopForm.values.all_media
    }
)

const PhotosComponenet = (props) => {
    const { initialValiues, uploadFile, deleteFile, setMainPhoto, loading , all_media} = props
    const [files, setFiles] = useState([]);
    const [image, setImage] = useState(null);
    
    let all_picture = all_media ? all_media.filter(media => media.type.includes('image')) : []

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    const handleUploadImage = async () => {
        try { 
            await uploadFile(image, `${initialValiues.id}/stopMedia/`, initialValiues.id, all_media)
            all_picture = all_media.filter(media => media.type.includes('image'))
            handleCancleCrop();
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
            await deleteFile(photo, initialValiues)
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

    return (
        <Segment>
            <Header dividing size='large' content='Your Photos' />
            <Grid>
                <Grid.Row />
                <Grid.Column width={4}>
                    <Header color='teal' sub content='Step 1 - Add Photo' />
                    <DropzoneInput setFiles={setFiles} acceptedFile='image/*'/>
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
                                    onClick={() => handleUploadImage()}
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
                {initialValiues.profile_pic && <Card>
                    <Image src={initialValiues.profile_pic.url || '/assets/user.png'} />
                    <Button positive>Main Photo</Button>
                </Card>}
                {all_media && all_picture.map(photo => (
                    <Card key={photo.name}>
                        <Image
                            src={photo.url}
                        />
                        <div className='ui two buttons'>
                            <Button onClick={() => handleSetMainFile(photo)} basic color='green'>Main</Button>
                            <Button onClick={() => handleDeletePhoto(photo)} basic icon='trash' color='red' />
                        </div>
                    </Card>
                ))}

            </Card.Group>
        </Segment>
    );

}

export default connect(mapState, actions)
    (reduxForm({
        form: 'stopForm',
        enableReinitialize: true,
        destroyOnUnmount: false,
        forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    })(PhotosComponenet));