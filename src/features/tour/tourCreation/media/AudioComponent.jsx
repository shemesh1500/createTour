import React, { useState, useEffect, Fragment } from 'react';
import { Segment, Header, Divider, Grid, Button, Card, Image, Form, Modal } from 'semantic-ui-react';
//import DropzoneInput from '../../tour/tourCreation/media/video/DropzoneInput';
import DropzoneInput from './DropzoneInput'
import { setMainPhoto } from '../../tourAction'
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { reduxForm } from 'redux-form';
import { uploadAudio } from '../../../media/mediaActions';


const actions = {
    setMainPhoto,
    uploadAudio
}

const mapState = (state) => ({
    //initialValiues: state.form.stopForm.values,
    loading: state.async.loading,
    //   stop: state.firestore.ordered[0],
    //   all_media: state.form.stopForm.values.all_media
})

const AudioComponent = (props) => {

    const {
        uploadAudio,
        setMainPhoto,
        loading,
        all_media,
        objectId,
        collectionName,
        handleDeleteFile,
        open,
        onClose } = props

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
            console.log("objectId", objectId)
            await uploadAudio(files[0].file, `${objectId}/${collectionName}Media/`, objectId, all_media, title, collectionName)
            handleCancleCrop();
        } catch (error) {
            console.log(error)
            toastr.error('Oops', 'Something went wrong')
        }
    }

    const handleCancleCrop = () => {
        setFiles([]);
        setTitle("")
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
    console.log("AUDIO COMPONENT")
    return (
        <Modal size='large' open={open} onClose={onClose}>
            <Modal.Header>
                Audio Zone
                </Modal.Header>
            <Modal.Content>
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
                    {all_audio && all_audio.map(audio => (
                        <Fragment>
                            <Card key={audio.name}>
                                <audio poster={audio.poster} width="260" hight="180" controls>
                                    <source src={audio.url} type={audio.type} />
                                </audio>
                                <div className='ui two buttons'>
                                    <Button onClick={() => handleSetMainPhoto(audio, objectId)} basic color='green'>Main</Button>
                                    <Button onClick={() => handleDeleteFile(audio)} basic icon='trash' color='red' />
                                </div>
                            </Card>
                        </Fragment>
                    ))}

                </Card.Group>
            </Modal.Content>
        </Modal>
    );

}

export default connect(mapState, actions)
    // (reduxForm({
    //     form: 'stopForm',
    //     enableReinitialize: true,
    //     destroyOnUnmount: false,
    //     forceUnregisterOnUnmount: true, //  unregister fields on unmount
    // 
    (AudioComponent);