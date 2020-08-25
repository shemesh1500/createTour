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
        text: "Here you can fill all the details.",
      });
    } else if (data === 3) {
      return renderModalTemplate({
        title: "Tour Preview",
        text: "This is a preview of what you create",
      });
    } else if (data === 4) {
      showArrow = true;
      return renderModalTemplate({
        title: "Main navigation bar",
        text:
          "This is the main navigation bar,\n 'Tour Summary' is where you give your users a overview of the tour.\n 'Create route' is where you build your tour",
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
    } else if (data === 11) {
      showArrow = true;
      return renderModalTemplate({
        title: "Tour name",
        text: "Let's start with the name of the tour",
      });
    } else if (data === 12) {
      showArrow = true;
      return renderModalTemplate({
        title: "Tour name",
        text: "Let's start with the name of the tour",
      });
    } else if (data === 13) {
      showArrow = true;
      return renderModalTemplate({
        title: "Tour name",
        text: "Let's start with the name of the tour",
      });
    } else if (data === 13) {
      showArrow = true;
      return renderModalTemplate({
        title: "Tour name",
        text: "Let's start with the name of the tour",
      });
    } else if (data === 14) {
      showArrow = true;
      return renderModalTemplate({
        title: "Tour name",
        text: "Let's start with the name of the tour",
      });
    } else if (data === 15) {
      showArrow = true;
      return renderModalTemplate({
        title: "Tour name",
        text: "Let's start with the name of the tour",
      });
    } else if (data === 16) {
      showArrow = true;
      return renderModalTemplate({
        title: "Tour name",
        text: "Let's start with the name of the tour",
      });
    } else if (data === 17) {
      showArrow = true;
      return renderModalTemplate({
        title: "Tour name",
        text: "Let's start with the name of the tour",
      });
    } else if (data === 18) {
      showArrow = true;
      return renderModalTemplate({
        title: "Tour name",
        text: "Let's start with the name of the tour",
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
      return "generalModal fieldsModal priceFieldModal";
    } else if (data === 9) {
      return "generalModal fieldsModal saveFirstForm";
    } else if (data === 10) {
      return "generalModal fieldsModal stepToSecondForm";
    } else if (data === 11) {
      return "generalModal fieldsModal hourFieldModal";
    } else if (data === 12) {
      return "generalModal fieldsModal audFieldModal";
    } else if (data === 13) {
      return "generalModal fieldsModal equFieldModal";
    } else if (data === 14) {
      return "generalModal fieldsModal typeFieldModal";
    } else if (data === 15) {
      return "generalModal fieldsModal mainSentFieldModal";
    } else if (data === 16) {
      return "generalModal fieldsModal fullDescFieldModal";
    } else if (data === 17) {
      return "generalModal fieldsModal notesFieldModal";
    } else if (data === 18) {
      return "generalModal fieldsModal saveFieldModal";
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
      return <div>{renderArrowTemplate(`tourPriceArrow`)}</div>;
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

  const renderArrowCss1 = () => {
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
      //setTimeout(() => setShowArrowLocation(!showArrowLocation), 1.5 * 1000);
      return showArrowLocation ? "mainHeadersArrow1" : "mainHeadersArrow2";
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

export default FirstTourForm;
