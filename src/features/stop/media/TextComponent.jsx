import React, { useState, Fragment, useEffect } from "react";
import { Divider, Button, Modal, Form, Header } from "semantic-ui-react";
import { uploadStopText } from "../../media/mediaActions";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import "react-quill/dist/quill.snow.css";
import cuid from "cuid";
import TextInput from "../../../app/common/form/textInput";
import TextAreaInput from "../../../app/common/form/textAreaInput";

const actions = {
  uploadStopText,
};

const mapState = (state) => ({
  loading: state.async.loading,
});

const TextComponent = (props) => {
  const { loading, open, onClose, context, uploadText } = props;

  const [title, setTitle] = useState();
  const [text, setText] = useState();
  useEffect(() => {
    setTitle(context && context.title ? context.title : "");
    setText(context && context.content ? context.content : "");
  }, [context]);

  const handleUploadText = async () => {
    try {
      //await uploadStopText(text, `${objectId}/${collectionName}Media/`, objectId, all_media,  collectionName, tourId)

      let newText = {
        type: "text",
        name: cuid(),
        title: title,
        content: text,
        order: context && context.order ? context.order : undefined,
      };
      uploadText(newText);
      handleCancleCrop();
      onClose();
    } catch (error) {
      console.log(error);
      toastr.error("Oops", "Something went wrong");
    }
  };

  const handleCancleCrop = () => {
    setTitle("");
    setText("");
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <Modal as={Form} size="large" open={open} onClose={onClose}>
      <Modal.Header>Text Zone</Modal.Header>
      <Modal.Content>
        <Form.Input
          label="Title"
          placeholder="Title"
          name="textTitle"
          component={TextInput}
          value={title}
          onChange={handleTitleChange}
        />

        <Form.TextArea
          label="Text"
          placeholder="Write your text media"
          onChange={handleTextChange}
          style={{
            width: "100%",
            margin: "0%",
            padding: "1%",
            borderRadius: "4px",
          }}
          value={text}
        />

        <Button
          loading={loading}
          onClick={handleUploadText}
          style={{ width: "100px" }}
          positive
          icon="check"
        />
        <Button
          disabled={loading}
          onClick={handleCancleCrop}
          style={{ width: "100px" }}
          icon="close"
        />
      </Modal.Content>
    </Modal>
  );
};

export default connect(mapState, actions)(TextComponent);
