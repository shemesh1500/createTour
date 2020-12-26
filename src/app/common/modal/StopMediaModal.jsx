import React from "react";
import "./mediaModal.css";
import trueAnswer from "../../../images/trueAnswer.svg";
import falseAnswer from "../../../images/falseAnswer.svg";
import { Icon } from "semantic-ui-react";

import { FixedSizeList as List } from "react-window";
import "../../../style/routePreview.css";

const StopMediaModal = ({ data, onHide, show }) => {
  const renderMedia = (mediaArr, index) => {
    
    if(index === 0){
      return(
        <div>Stop Name</div>
      )
    }
    else if (index === 1){
      return (
        <div>type</div>
      )
    }
    else if(index === 2){
      return(
        <div>Info</div>
      )
    }
else{
  let media = mediaArr[index - 3] 
  if (data.type.includes("image")) {
      return <img className="imgModal" src={data.url} />;
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

 const all_media = data ? data.all_media : []
  return (
    <React.Fragment>
      {show && (
        <div >
           <Icon name="close" className="closeIcon" />
          {all_media ? (
            <List
              className="List"
              direction="horizontal"
              height={55}
              itemCount={all_media.length}
              itemSize={50}
              width={200}
            >
              {({ key, index, style }) => (
                <div
                  className={index % 2 ? "ListItemOdd" : "ListItemEven"}
                  key={key}
                  style={style}
                >
                  {renderMedia(all_media, index)}
                </div>
              )}
            </List>
          ) : (
            <div>The stop is still empty of context</div>
          )}
        <div className="stopHeader">{data ? data.s_title : ""}</div>
      </div>
      )}
    </React.Fragment>
  );
};

export default StopMediaModal;
