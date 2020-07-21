import React, { useState, Fragment } from 'react';
import { Divider, Button, Card, Modal } from 'semantic-ui-react';
import { addQuestion } from '../../media/mediaActions'
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

const actions = {
    addQuestion
}

const mapState = (state) => ({
    loading: state.async.loading,
})

const QuestionComponent = (props) => {

    const {
        loading,
        all_media,
        objectId,
        open,
        onClose,
        tourId,
        addQuestion
    } = props

    const [question, setQuestion] = useState("")
    const [answers, setAnswers] = useState([
        { option: '', isAnswer: false }
    ]);

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            await addQuestion(question, answers, tourId,objectId,all_media)
            onClose()
        } catch (error) {
            console.log(error)
            toastr.error('Oops', 'Something went wrong')
        }
    }
    const handleQuestionChange = (e) => {
        setQuestion(e.target.value)
    }

    const handleOptionChange = (e) => {
        const updateOption = [...answers]
        if(e.target.className === 'option'){
            updateOption[e.target.dataset.idx][e.target.className] = e.target.value
        }  else{
            updateOption[e.target.dataset.idx][e.target.className] = e.target.checked
        }
        
        setAnswers(updateOption)
    }

    const handleAddFields = () => {
        const values = [...answers];
        values.push({ option: '', isAnswer: false });
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
                                className="question"
                                id="question"
                                name="question"
                                value={question}
                                onChange={handleQuestionChange}
                            />
                        </Fragment>
                    </div>
                    {answers && answers.map((answer, index) => (
                        <Fragment key={`${answer}~${index}`}>
                            <label htmlFor="Answer1">Answer</label>
                            <input
                                type="text"
                                name={`option-${index}`}
                                data-idx={index}
                                id={`option-${index}`}
                                className="option"
                                value={answers[index].option}
                                onChange={handleOptionChange}
                            />
                            <input
                                type="checkbox"
                                name={`isAnswer-${index}`}
                                data-idx={index}
                                id={`isAnswer-${index}`}
                                className="isAnswer"
                                value={answers[index].isAnswer}
                                onChange={handleOptionChange}
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