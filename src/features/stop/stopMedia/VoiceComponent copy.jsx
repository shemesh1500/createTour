import React, { useState, useEffect, Fragment } from 'react';
import { Segment, Header, Divider, Grid, Button, Card, Image } from 'semantic-ui-react';
import DropzoneInput from './DropzoneInput';
import { setMainPhoto } from '../../tour/tourAction'
import { uploadAudio, deleteAudio } from '../stopAction'
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { reduxForm, Form } from 'redux-form';

const actions = {
    deleteAudio,
    setMainPhoto,
    uploadAudio
}

const mapState = (state) => (
    {
        initialValiues: state.form.stopForm.values,
        loading: state.async.loading,
        stop: state.firestore.ordered[0],
        all_media : state.form.stopForm.values.all_media
    }
)

const VoiceComponent = (props) => {
    const { initialValiues, uploadAudio, deleteAudio, setMainPhoto, loading , all_media} = props
    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState("");
    
    let all_audio = all_media && all_media.filter(media => media.type.includes('audio')) 

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview))
        }
    }, [files])


    const handleUploadAudio = async () => {
        try {
            await uploadAudio(files[0].file, `${initialValiues.id}/stopMedia/`, initialValiues.id, all_media, title)
            all_audio = all_media.filter(media => media.type.includes('audio'))
            handleCancleCrop();
            toastr.success("Success", "Audio has been loaded")
        } catch (error) {
            console.log(error)
            toastr.error('Oops', 'Somethingwent wrong')
        }
    }

    const handleCancleCrop = () => {
        setFiles([]);
        setTitle("");
    }

    const handleDeleteAudio = async (audio) => {
        try {
            await deleteAudio(audio, initialValiues)
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

    const handleTitle = (event) => {
        setTitle(event.target.value)
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
                {all_audio && all_audio.map(video => (
                    <Fragment>
                        <Card key={video.name}>
                            <video poster={video.poster} width="260" hight="180" controls>
                                <source src={video.url} type={video.type} />
                            </video>
                            <div className='ui two buttons'>
                                <Button onClick={() => handleSetMainFile(video)} basic color='green'>Main</Button>
                                <Button onClick={() => handleDeleteAudio(video)} basic icon='trash' color='red' />
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
    })(VoiceComponent));