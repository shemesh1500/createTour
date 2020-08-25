import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import disArrow from "../../images/arrow.png";
import "./businessModalInstraction.css";

const BusinessModalInstraction = (props) => {
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

  const renderArrowTemplate = (style) => {
    return (
      <div className="arrowTEST">
        <img src={disArrow} className={`instractionArrow ${style}`} />
      </div>
    );
  };

  const renderModal = () => {
    if (data === 1) {
      return renderModalTemplate({
        title: "Create your Business",
        text:
          "Here you can build your Business, we will guide you step by step until your first sell. \n Let's start:",
      });
    } else if (data === 2) {
      return renderModalTemplate({
        title: "Business details",
        text: "Here you can fill all the details about your business.",
      });
    } else if (data === 3) {
      showArrow = true;
      return renderModalTemplate({
        title: "Tour Preview",
        text: "This is a preview of what you create",
      });
    } else if (data === 4) {
      showArrow = true;
      return renderModalTemplate({
        title: "Insert the specific address",
        text:
          "This is the main navigation bar,\n 'Tour Summary' is where you give your users a taste of the tour.",
      });
    } else if (data === 5) {
      showArrow = true;
      return renderModalTemplate({
        title: "Tour name",
        text: "Let's start with the name of the tour",
      });
    } else if (data === 6) {
      showArrow = true;
      return renderModalTemplate({
        title: "Tour name",
        text: "Let's start with the name of the tour",
      });
    } else if (data === 7) {
      showArrow = true;
      return renderModalTemplate({
        title: "Tour name",
        text: "Let's start with the name of the tour",
      });
    } else if (data === 8) {
      showArrow = true;
      return renderModalTemplate({
        title: "Tour name",
        text: "Let's start with the name of the tour",
      });
    } else if (data === 9) {
      showArrow = true;
      return renderModalTemplate({
        title: "Tour name",
        text: "Let's start with the name of the tour",
      });
    } else if (data === 10) {
      showArrow = true;
      return renderModalTemplate({
        title: "Tour name",
        text: "Let's start with the name of the tour",
      });
    }
  };

  const renderCSS = () => {
    if (data === 1) {
      return "generalModal BfirstModal";
    } else if (data === 2 || data === 3) {
      return "generalModal BsecondModal";
    } else if (data === 3) {
      return "generalModal BthirdModal";
    } else if (data === 4) {
      return "generalModal BaddressModal";
    } else if (data === 5) {
      return "generalModal BaddressDescModal";
    } else if (data === 6) {
      return "generalModal fieldsModal BaddPicModal";
    } else if (data === 7) {
      return "generalModal BlatLngModal";
    } else if (data === 8) {
      return "generalModal BsaveModal";
    } else if (data === 9) {
      return "generalModal fieldsModal difcFieldModal";
    } else if (data === 10) {
      return "generalModal fieldsModal hourFieldModal";
    }
  };

  const renderMarkerCss = () => {
    if (data === 1) {
      return "None";
    } else if (data === 2 || data === 3) {
      return "generalMarker peakLocMarker";
    } else if (data === 3) {
      return "generalMarker allPreviewMarker";
    } else if (data === 4) {
      return "None";
    }
  };
  const [showArrowLocation, setShowArrowLocation] = useState(true);
  const renderArrowCss = () => {
    let arrowStyle = ["firstArw", "secondArw", "thirdArw", "fourthArw"];
    if (data === 3) {
      return (
        <div>
          {arrowStyle.map((style) =>
            renderArrowTemplate(`${style} mainNavTop`)
          )}
        </div>
      );
    } else if (data === 4) {
      return <div>{renderArrowTemplate(`addressArw`)}</div>;
    } else if (data === 5) {
      return <div>{renderArrowTemplate(`descAddArw`)}</div>;
    } else if (data === 6) {
      return <div>{renderArrowTemplate(`addPicArw`)}</div>;
    } else if (data === 7) {
      return <div>{renderArrowTemplate(`latLngArw`)}</div>;
    } else if (data === 8) {
      return <div>{renderArrowTemplate(`saveAddArw`)}</div>;
    } else if (data === 9) {
      return "tourDifcArrow";
    } else if (data === 10) {
      return "tourHourArrow";
    } else if (data === 11) {
      return "tourAudArrow";
    } else if (data === 12) {
      return "tourTypeArrow";
    } else if (data === 13) {
      return "tourMainSentArrow";
    } else if (data === 14) {
      return "tourFullDescArrow";
    } else if (data === 15) {
      return "tourNotesArrow";
    }
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

export default BusinessModalInstraction;
