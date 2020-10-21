import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import disArrow from "../../images/arrow.png";
import "./tourModalInstraction.css";

const FirstTourForm = (props) => {
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
    if (data === 1) {
      return renderModalTemplate({
        title: "Create your tour",
        text:
          "Here you can build your tour, we will guide you step by step until your first sell. \n Let's start:",
      });
    } else if (data === 2) {
      return renderModalTemplate({
        title: "Tour details",
        text: "On the left side you can fill all the details.",
      });
    } else if (data === 3) {
      return renderModalTemplate({
        title: "Tour Preview",
        text: "On the right side you can check the preview of what you create",
      });
    } else if (data === 4) {
      showArrow = true;
      return renderModalTemplate({
        title: "Main navigation bar",
        text:
          "This is the main navigation bar,\n 'Tour Summary' is where you give your users a overview of the tour.\n 'Create route' is where you build your tour, with stops and content",
      });
    } else if (data === 5) {
      showArrow = true;
      return renderModalTemplate({
        title: "Sub navigation bar",
        text:
          "This is the Sub navigation bar,\n includes all the general info about the tour.\n In three steps you need to be able to attract the attention of the customers.\n Let's start to fill it",
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
        title: "Location",
        text: "Peak a general location of your tour",
      });
    } else if (data === 8) {
      showArrow = true;
      return renderModalTemplate({
        title: "Tour language",
        text: "What is the language of the content?",
      });
    } else if (data === 9) {
      showArrow = true;
      return renderModalTemplate({
        title: "Save & Continue",
        text: "Save bufore you continue to the next step",
      });
    } else if (data === 10) {
      showArrow = true;
      return renderModalTemplate({
        title: "Next step",
        text: "Navigate to next step",
      });
    }
  };

  const renderCSS = () => {
    if (data === 1) {
      return "generalModal firstModal";
    } else if (data === 2) {
      return "generalModal secondModal";
    } else if (data === 3) {
      return "generalModal thirdModal";
    } else if (data === 4) {
      return "generalModal fourthModal";
    } else if (data === 5) {
      return "generalModal fifthModal";
    } else if (data === 6) {
      return "generalModal fieldsModal";
    } else if (data === 7) {
      return "generalModal fieldsModal locationFieldModal";
    } else if (data === 8) {
      return "generalModal fieldsModal languageFieldModal";
    } else if (data === 9) {
      return "generalModal fieldsModal saveFirstForm";
    } else if (data === 10) {
      return "generalModal fieldsModal stepToSecondForm";
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
  const [showArrowLocation, setShowArrowLocation] = useState(true);
  const renderArrowCss = () => {
    if (data === 4) {
      let arrowStyle = ["topNavArr1", "topNavArr2"];
      return (
        <div>
          {arrowStyle.map((style) =>
            renderArrowTemplate(`${style} mainNavTo1p`)
          )}
        </div>
      );
    } else if (data === 5) {
      let arrowStyle = ["subNavArr1", "subNavArr2", "subNavArr3"];
      return (
        <div>{arrowStyle.map((style) => renderArrowTemplate(`${style}`))}</div>
      );
    } else if (data === 6) {
      return <div>{renderArrowTemplate(`tourNameArrow`)}</div>;
    } else if (data === 7) {
      return <div>{renderArrowTemplate(`tourLocationArrow`)}</div>;
    } else if (data === 8) {
      return <div>{renderArrowTemplate(`tourLangArrow`)}</div>;
    } else if (data === 9) {
      return <div>{renderArrowTemplate(`saveFirstArrow`)}</div>;
    } else if (data === 10) {
      return <div>{renderArrowTemplate(`stepSecondForm`)}</div>;
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

export default FirstTourForm;
