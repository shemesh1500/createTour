import React from "react";
import "./mediaModal.css";
import trueAnswer from "../../../images/trueAnswer.svg";
import falseAnswer from "../../../images/falseAnswer.svg";
import { Icon } from "semantic-ui-react";

const MediaModal = ({ data, onHide, show }) => {
  const renderModal = () => {
    
    if (data.type.includes("image")) {
      return <img className="imgModal" src={data.url} alt='imageMedia'/>;
    } else if (data.type.includes("audio")) {
      return (
        <audio
          preload="auto"
          id="id12"
          className="audioModalPlayer"
          controls="controls"
          onended="func12();"
          src={data.url}
        ></audio>
      );
    } else if (data.type.includes("video")) {
      return (
        <video className="videoModalPlayer" poster={data.poster_url} controls>
          <source src={data.url} type={data.type} />
        </video>
      );
    } else if (data.type.includes("text")) {
      return (
        <div
          className="textContent"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      );
    } else if (data.type.includes("question")) {
      return (
        <div className="questionContext">
          <div className="theQuestion">{data.question_text}</div>
          {data.options.map((answer) => (
            <div className="theAnswer">
              <img
                className="answerImg"
                src={answer.isAnswer ? trueAnswer : falseAnswer}
                alt="isAnswer"
              />
              {answer.option}
            </div>
          ))}
        </div>
      );
    }
  };

  const renderCSS = () => {
    if (data.type.includes("image")) {
      return "generalModal mediaModal";
    } else if (data.type.includes("audio")) {
      return "generalModal voiceModal";
    } else if (data.type.includes("video")) {
      return "generalModal videoModal";
    } else if (data.type.includes("text")) {
      return "generalModal textModal";
    } else if (data.type.includes("question")) {
      return "generalModal questionModal";
    }
  };

  return (
    <React.Fragment>
      {show && (
        <div className={renderCSS()} onClick={onHide}>
          <Icon name="close" className="closeIcon" />
          {renderModal()}
        </div>
      )}
    </React.Fragment>
  );
};

export default MediaModal;
