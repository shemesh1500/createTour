import React, { useState, Fragment } from 'react';
import { Divider, Button, Card, Modal } from 'semantic-ui-react';
import { uploadStopText } from '../../media/mediaActions'
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

const actions = {
}

const mapState = (state) => ({
    loading: state.async.loading,
})

const QuestionComponent = (props) => {

    const {
        loading,
        all_media,
        objectId,
        collectionName,
        open,
        onClose,
        tourId,
    } = props

    //const [question, setQuestion] = useState({question1 : ""})
    let question = ""
    const [answers, setAnswers] = useState([{ Option: '', isAnswer: false }])

    const handleSubmit = (event) => {
        try {
            event.preventDefault();
            console.log("Question", question, answers)
        } catch (error) {
            console.log(error)
            toastr.error('Oops', 'Something went wrong')
        }
    }
    const handleAddFields = () => {
        const values = [...answers];
        values.push({ Option: '', isAnswer: false });
        setAnswers(values);
    };

    const handleRemoveFields = index => {
        const values = [...answers];
        values.splice(index, 1);
        setAnswers(values);
    };

    const handleCancleCrop = () => {

    }

    return (
        <Modal size='large' open={open} onClose={onClose}>
            <Modal.Header>
                Question
                </Modal.Header>
            <Modal.Content>
                <form onSubmit={handleSubmit}>
                    <div className="form-group col-sm-12">
                        <Fragment key={`question`}>
                            <label htmlFor="qustion">Your Question</label>
                            <input
                                type="text"
                                className="form-control"
                                id="question"
                                name="question"
                            //value={question}
                            />
                        </Fragment>
                    </div>
                    {answers && answers.map((answer, index) => (
                        <Fragment key={`${answer}~${index}`}>
                            <label htmlFor="Answer1">Answer</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Answer1"
                                name="Answer1"
                                value={answers.Option}
                            />
                            <input
                                type="checkbox"
                                className="form-control"
                                id="isAnswer1"
                                name="isAnswer1"
                                value={answers.isAnswer}
                            />
                            <button
                                className="btn btn-link"
                                type="button"
                                onClick={() => handleRemoveFields(index)}
                            >
                                -
                                </button>
                            <button
                                className="btn btn-link"
                                type="button"
                                onClick={() => handleAddFields()}
                            >
                                +
                                </button>
                        </Fragment>
                    ))}



                    <Button
                        loading={loading}
                        type="submit"
                        onSubmit={handleSubmit}
                        style={{ width: '100px' }}
                        positive
                        icon='check'
                    />
                </form>
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
    (QuestionComponent);