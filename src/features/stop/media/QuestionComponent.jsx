import React, { useState, Fragment, useEffect } from "react";
import { Divider, Button, Card, Modal, Header } from "semantic-ui-react";
import { addQuestion } from "../../media/mediaActions";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import cuid from "cuid";
import "./questionStyle.css";

const actions = {
  addQuestion,
};

const mapState = (state) => ({
  loading: state.async.loading,
});

const QuestionComponent = (props) => {
  const { loading, open, onClose, uploadQuestion, content } = props;
  console.log("question COntent", content);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([{ option: "", isAnswer: false }]);

  useEffect(() => {
    setQuestion(content && content.question_text ? content.question_text : "");
    setAnswers(
      content && content.options
        ? content.options
        : [{ option: "", isAnswer: false }]
    );
  }, [content]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      //await addQuestion(question, answers, tourId,objectId,all_media)
      const question_media = {
        name: cuid(),
        question_text: question,
        options: answers,
        type: "question",
      };
      uploadQuestion(question_media);
      onClose();
    } catch (error) {
      console.log(error);
      toastr.error("Oops", "Something went wrong");
    }
  };
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (e) => {
    const updateOption = [...answers];
    if (e.target.className === "option") {
      updateOption[e.target.dataset.idx][e.target.className] = e.target.value;
    } else {
      updateOption[e.target.dataset.idx][e.target.className] = e.target.checked;
    }

    setAnswers(updateOption);
  };

  const handleAddFields = () => {
    const values = [...answers];
    values.push({ option: "", isAnswer: false });
    setAnswers(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...answers];
    values.splice(index, 1);
    setAnswers(values);
  };
  const handleCancleCrop = () => {};

  return (
    <Modal size="large" open={open} onClose={onClose}>
      <Modal.Header>Question</Modal.Header>
      <Modal.Content>
        <form onSubmit={handleSubmit}>
          <div className="questionContent">
            <div className="questionInput" key={`question`}>
              <label className="inputHeader1" htmlFor="qustion"></label>
              <Header size="small" content="Your Question" />
              <input
                type="text"
                className="question"
                id="question"
                name="question"
                value={question}
                onChange={handleQuestionChange}
              />
            </div>

            {answers &&
              answers.map((answer, index) => (
                <div className="questionInput1" key={`${answer}~${index}`}>
                  <label className="inputHeader" htmlFor="Answer1"></label>
                  <Header size="small" content="Answer" />

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
                  <div className="addRemoveQuestion">
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
                  </div>
                </div>
              ))}
          </div>
          <div className="buttonArea">
            <Button
              loading={loading}
              type="submit"
              onSubmit={handleSubmit}
              style={{ width: "100px", height: "30px", margin: "5px" }}
              positive
              icon="check"
            />
          </div>
        </form>
        <Button
          disabled={loading}
          onClick={handleCancleCrop}
          style={{ width: "100px", height: "30px", margin: "5px" }}
          icon="close"
        />

        <Divider />
      </Modal.Content>
    </Modal>
  );
};

export default connect(mapState, actions)(QuestionComponent);
