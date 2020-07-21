import React, { useState, Fragment } from 'react';
import { Divider, Button, Card, Modal } from 'semantic-ui-react';
import { uploadStopText } from '../../media/mediaActions'
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import cuid from 'cuid';

const actions = {
    uploadStopText
}

const mapState = (state) => ({
    loading: state.async.loading,
})

const TextComponent = (props) => {

    const {
        uploadStopText,
        loading,
        all_media,
        objectId,
        collectionName,
        handleDeleteFile,
        open,
        onClose,
        tourId,
        context,
        uploadText
    } = props


    let all_text = context ? context : "Write something"
    const [text, setText] = useState(all_text);

    const handleUploadText = async () => {
        try {
            //await uploadStopText(text, `${objectId}/${collectionName}Media/`, objectId, all_media,  collectionName, tourId)
            let newText ={
                type: 'text',
                name : cuid(),
                content : text
            }
            uploadText(newText)
            handleCancleCrop();
        } catch (error) {
            console.log(error)
            toastr.error('Oops', 'Something went wrong')
        }
    }

    const handleCancleCrop = () => {
        setText("");
    }

    const handleChange = (html) => {
        setText(html)
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
                    value={text}
                    modules={modules}
                    formats={formats}
                    bounds={'.Modal'}
                    //placeholder={"Write something"}
                    />
                </div>
                <Button
                    loading={loading}
                    onClick={handleUploadText}
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
            </Modal.Content>
        </Modal>
    );

}

export default connect(mapState, actions)
    (TextComponent);