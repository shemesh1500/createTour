import React, { useState } from "react";
import imageDivider from "../../../images/divider.svg";
import imageCheckbox from "../../../images/checkboxQuiz.svg";
import imageCheckboxOn from "../../../images/checkboxQuizOn.svg";
import videoMedia from "../../../images/videoMedia.svg";
import audioMedia from "../../../images/audioMedia.svg";
import textMedia from "../../../images/textMedia.svg";
import questionMedia from "../../../images/questionMedia.svg";
import { FixedSizeList as List } from "react-window";


import "../../../style/routePreview.css";

const StopPreview = (props) => {
  const { stop, getPreview } = props;

  console.log("STOP PREVIEW", stop.type);

  const renderMedia = (all_media, index) => {
/*     let data = {all_media : stop._all_media, s_title : stop.s_title}
    return(
      <img onClick={() => getPreview(data)} src={imageMedia} alt="image" />
    ) */
    if(index === 0){
      return(
        <div>
        <div className='stopPreviewHeader'>
        <div className='stopPreviewTitle'>{stop.s_title ? stop.s_title : ""}</div>
        <div className='stopPreviewType'> {stop.tag ? stop.tags.map(type => type + " / "): ""}</div>
        </div>
         <div className='stopPreviewInfo'>
         <div className='stopInfoTitle'>Info</div>
         <div className='stopInfoContent'>{stop.s_smallDesc ? stop.s_smallDesc: ""}</div>
         </div>
         </div>
      )
    }
    else{
      const media = all_media[index-1]
      if (media.type.includes("image")) {
        return (
          <div className='stopPreviewImage'><img className="stopPreviewImage" src={media.url} /></div>
        );
      } else if (media.type.includes("video")) {
        return (
          <div className='stopPreviewVideo'>
              <video className="videoModalPlayer" poster={media.poster_url} controls>
            <source src={media.url} type={media.type} />
          </video>
            </div>
        );
      } else if (media.type.includes("audio")) {
        return (
          <audio
          preload="auto"
          id="id12"
          className="stopPreviewAudio"
          controls="controls"
          onEnded="func12();"
          src={media.url}
        ></audio>

        );
      } else if (media.type.includes("text")) {
        return (
         <div className='stopPreviewInfo'>
         <div className='stopInfoTitle'>{media.title ? media.title : 'More info'}</div>
         <div className='stopInfoContent'>{media.content}</div>
         </div>
        );
      } else if (media.type.includes("question")) {
        console.log("QUESTION", media);
        return (
          <div className='stopPreviewQuestion'>
            <div className='quizTitle'>{media.question_text}</div>
            {media.options.map(ans =>
             <div className='quizAnswer' > {ans.isAnswer ? <img src={imageCheckboxOn} className='checkboxQuiz' /> : <img src={imageCheckbox} className='checkboxQuiz' /> }  {ans.option} </div>)}
            
          </div>
        );
      }
  }
  };
  return (
    <div >
      <div className='stopMediaList'>
        {stop.all_media ? (
          <List
            // className="List"
            //direction="horizontal"
            height={600} 
            itemCount={stop.all_media.length+1}
            itemSize={300}
            width={400}
          >
            {({ key, index, style }) => (
              <div
              // className={index % 2 ? "ListItemOdd" : "ListItemEven"}
                key={key}
                style={style}
              >
                {renderMedia(stop.all_media, index)}
                <img src={imageDivider} class="divider"/>
              </div>
            )}
          </List>
        ) : (
          <div>The stop is still empty of context</div>
        )}
      </div>
      <div className="stopHeader">{stop.s_title}</div>
    </div>
  );
};

export default StopPreview;
