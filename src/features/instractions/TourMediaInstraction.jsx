import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import disArrow from "../../images/arrow.png";
import "./tourModalInstraction.css";

const TourMediaInstraction = (props) => {
  const { show, data, onHide, onNext, onPrevious } = props;
  //const [showArrow, setShowArrow] = useState(false);
  let showArrow = false;
  const renderModalTemplate = (context) => {
    return (
      <div>
        <div className="modalTitle">{context.title}</div>
        <div className="modalText">{context.text}</div>
        {data !== 1 && (
          <button className="previousButton" onClick={() => onPrevious()}>
            Previous
          </button>
        )}
        {data !== 30 && (
          <button className="nextButton" onClick={() => onNext()}>
            Next
          </button>
        )}
      </div>
    );
  };

  const renderModal = () => {
    if (data === 20) {
      showArrow = true;
      return renderModalTemplate({
        title: "Add media preview",
        text:
          "With this context you expose the tourist to your tour. \n This is very important step, make sure the content is intriguing and engaging",
      });
    } else if (data === 21) {
      showArrow = true;
      return renderModalTemplate({
        title: "Photo upload",
        text: "Lets start with photo upload for example",
      });
    } else if (data === 22) {
      showArrow = true;
      return renderModalTemplate({
        title: "Media list",
        text: "This is the list of all the content that you upload",
      });
    }
  };

  const renderCSS = () => {
    if (data === 20) {
      return "generalModal mediaTypeInst";
    } else if (data === 21) {
      return "generalModal mediaPhotoInst";
    } else if (data === 22) {
      return "generalModal mediaListInst";
    } else if (data === 23) {
      return "generalModal mediaSaveInst";
    } else if (data === 23) {
      return "generalModal mediaListInst";
    }
  };
  const renderMarkerCss = () => {
    if (data === 1) {
      return "None";
    } else if (data === 2) {
      return "generalMarker allFormMarker";
    } else if (data === 3) {
      return "generalMarker allPreviewMarker";
    } else if (data === 4) {
      return "generalMarkerN mainHeadersN";
    }
  };

  const renderArrowCss = () => {
    if (data === 20) {
      let arrowStyle = ["topMediaArr1", "topMediaArr2", "topMediaArr3"];
      return (
        <div>
          {arrowStyle.map((style) =>
            renderArrowTemplate(`${style} mainNavTo1p`)
          )}
        </div>
      );
    } else if (data === 21) {
      return <div>{renderArrowTemplate(`topMediaArr3`)}</div>;
    } else if (data === 22) {
      return <div>{renderArrowTemplate(`mediaListArr`)}</div>;
    } else if (data === 23) {
      return <div>{renderArrowTemplate(`mediaSaveArrow`)}</div>;
    } else if (data === 9) {
      return <div>{renderArrowTemplate(`saveFirstArrow`)}</div>;
    } else if (data === 10) {
      return <div>{renderArrowTemplate(`stepSecondForm`)}</div>;
    } else if (data === 11) {
      return <div>{renderArrowTemplate(`tourHourArrow`)}</div>;
    } else if (data === 12) {
      return <div>{renderArrowTemplate(`tourAudArrow`)}</div>;
    } else if (data === 13) {
      return <div>{renderArrowTemplate(`tourEquArrow`)}</div>;
    } else if (data === 14) {
      return <div>{renderArrowTemplate(`tourTypeArrow`)}</div>;
    } else if (data === 15) {
      return <div>{renderArrowTemplate(`tourMainSentArrow`)}</div>;
    } else if (data === 16) {
      return <div>{renderArrowTemplate(`tourFullDescArrow`)}</div>;
    } else if (data === 17) {
      return <div>{renderArrowTemplate(`tourNotesArrow`)}</div>;
    } else if (data === 18) {
      return <div>{renderArrowTemplate(`tourSaveArrow`)}</div>;
    }
  };

  const renderArrowTemplate = (style) => {
    return (
      <div className="arrowTEST">
        <img src={disArrow} className={`instractionArrow ${style}`} />
      </div>
    );
  };

  return (
    <div>
      <React.Fragment>
        {show && (
          <div className={renderCSS()}>
            <Icon name="close" className="closeIcon" onClick={() => onHide()} />
            {renderModal()}
          </div>
        )}
      </React.Fragment>
      <React.Fragment>
        {show && <div className={renderMarkerCss()}></div>}
      </React.Fragment>
      <React.Fragment>{show && showArrow && renderArrowCss()}</React.Fragment>
    </div>
  );
};

export default TourMediaInstraction;
