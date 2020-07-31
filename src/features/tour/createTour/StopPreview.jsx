import React, { useState } from "react";
import imageMedia from "../../../images/imageMedia.svg";
import videoMedia from "../../../images/videoMedia.svg";
import audioMedia from "../../../images/audioMedia.svg";
import textMedia from "../../../images/textMedia.svg";
import questionMedia from "../../../images/questionMedia.svg";
import { FixedSizeList as List } from "react-window";
import "../../../style/routePreview.css";

const StopPreview = (props) => {
  const { stop, getPreview } = props;

  const renderMedia = (media) => {
    if (media.type.includes("image")) {
      return (
        <img onClick={() => getPreview(media)} src={imageMedia} alt="image" />
      );
    } else if (media.type.includes("video")) {
      return (
        <img onClick={() => getPreview(media)} src={videoMedia} alt="video" />
      );
    } else if (media.type.includes("audio")) {
      return (
        <img onClick={() => getPreview(media)} src={audioMedia} alt="audio" />
      );
    } else if (media.type.includes("text")) {
      return (
        <img onClick={() => getPreview(media)} src={textMedia} alt="text" />
      );
    } else if (media.type.includes("question")) {
      return (
        <img
          onClick={() => getPreview(media)}
          src={questionMedia}
          alt="question"
        />
      );
    }
  };
  console.log("stop.all_media", stop.all_media);

  return (
    <div className="stopPreview">
      <div className="mediaList">
        {stop.all_media ? (
          <List
            className="List"
            direction="horizontal"
            height={55}
            itemCount={stop.all_media.length}
            itemSize={50}
            width={200}
          >
            {({ key, index, style }) => (
              <div
                className={index % 2 ? "ListItemOdd" : "ListItemEven"}
                key={key}
                style={style}
              >
                {renderMedia(stop.all_media[index])}
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
