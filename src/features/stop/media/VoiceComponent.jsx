import React, { useState, useEffect, Fragment } from 'react';
import { Segment, Header, Divider, Grid, Button, Card, Image, Form } from 'semantic-ui-react';
//import DropzoneInput from '../../tour/tourCreation/media/video/DropzoneInput';
import DropzoneInput from './DropzoneInput'
import { deleteAudio, uploadAudio } from '../stopAction'
import { setMainPhoto } from '../../tour/tourAction'
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { reduxForm } from 'redux-form';


const actions = {
    deleteAudio,
    setMainPhoto,
    uploadAudio
}

const mapState = (state) => ({
    initialValiues: state.form.stopForm.values,
        loading: state.async.loading,
        stop: state.firestore.ordered[0],
        all_media: state.form.stopForm.values.all_media
})

const AudioComponent = ({ initialValiues, uploadAudio, deleteAudio, setMainPhoto, loading, all_media }) => {
    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    let all_audio = all_media ? all_media.filter(media => media.type.includes('audio')) : []

    const handleUploadAudio = async () => {
        try {
            await uploadAudio(files[0].file, `${initialValiues.id}/stopMedia/`, initialValiues.id ,all_media, title)
            handleCancleCrop();
        } catch (error) {
            console.log(error)
            toastr.error('Oops', 'Somethingwent wrong')
        }
    }

    const handleCancleCrop = () => {
        setFiles([]);
        setTitle("")
    }

    const handleDeleteAudio = async (audio) => {
        try {
            await deleteAudio(audio, initialValiues)
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
                                onClick={handleUploadAudio}
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
                {initialValiues.profile_pic && <Card>
                    <Image src={initialValiues.profile_pic.url || '/assets/user.png'} />
                    <Button positive>Main Photo</Button>
                </Card>}
                {all_audio && all_audio.map(audio => (
                    <Fragment>
                        <Card key={audio.name}>
                            <audio poster={audio.poster} width="260" hight="180" controls>
                                <source src={audio.url} type={audio.type} />
                            </audio>
                            <div className='ui two buttons'>
                                <Button onClick={() => handleSetMainPhoto(audio, initialValiues)} basic color='green'>Main</Button>
                                <Button onClick={() => handleDeleteAudio(audio)} basic icon='trash' color='red' />
                            </div>
                        </Card>
                    </Fragment>
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
})
(AudioComponent));