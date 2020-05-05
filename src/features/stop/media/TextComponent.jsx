import React, { useState, Fragment } from 'react';
import { Divider, Button, Card, Modal } from 'semantic-ui-react';
import { setMainPhoto } from '../../tour/tourAction'
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { uploadStopAudio } from '../../media/mediaActions';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

const actions = {
    setMainPhoto,
    uploadStopAudio
}

const mapState = (state) => ({
    loading: state.async.loading,
})

const TextComponent = (props) => {

    const {
        setMainPhoto,
        loading,
        all_media,
        objectId,
        collectionName,
        handleDeleteFile,
        uploadStopAudio,
        open,
        onClose,
        tourId
    } = props

    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState("");


    let all_audio = all_media ? all_media.filter(media => media.type.includes('text')) : []

    const handleUploadAudio = async () => {
        try {
            console.log("objectId", objectId)
            await uploadStopAudio(files[0].file, `${objectId}/${collectionName}Media/`, objectId, all_media, title, collectionName, tourId)
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

    const handleChange = (html) => {
        //this.setState({ editorHtml: html });
        console.log(html)
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

    /* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        }
    }
    /* 
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     */
    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ]


    console.log("TEXT COMPONENT")
    return (
        <Modal size='large' open={open} onClose={onClose}>
            <Modal.Header>
                Text Zone
                </Modal.Header>
            <Modal.Content>
                <div>
                    <ReactQuill
                        theme="snow"
                    onChange={handleChange}
                    value={"Write something"}
                    modules={modules}
                    formats={formats}
                    bounds={'.Modal'}
                    placeholder={"Write something"}
                    />
                </div>
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
    (TextComponent);