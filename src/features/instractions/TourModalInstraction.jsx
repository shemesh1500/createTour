import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import disArrow from "../../images/arrow.png";
import "./tourModalInstraction.css";

const TourModalInstraction = (props) => {
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
    if (data === 10) {
      showArrow = true;
      return renderModalTemplate({
        title: "Tour Price",
        text:
          "Here you decide about the price of the tour, remember, you just started and you collect reviews and customers is important for starting your new business, so attract them with low price. ",
      });
    } else if (data === 11) {
      showArrow = true;
      return renderModalTemplate({
        title: "Difficulty",
        text: "In range of 1-10, how do you rate the difficulty of the tour.",
      });
    } else if (data === 12) {
      showArrow = true;
      return renderModalTemplate({
        title: "Hours",
        text: "When your tour is available?",
      });
    } else if (data === 13) {
      showArrow = true;
      return renderModalTemplate({
        title: "Your audience",
        text: "Which types of audience would like your tour",
      });
    } else if (data === 14) {
      showArrow = true;
      return renderModalTemplate({
        title: "Equipment",
        text: "Let your customers to be prepr with the right equipment",
      });
    } else if (data === 15) {
      showArrow = true;
      return renderModalTemplate({
        title: "Tour type",
        text: "What is the type of your tour?",
      });
    } else if (data === 16) {
      showArrow = true;
      return renderModalTemplate({
        title: "Main sentence",
        text:
          "We use this to promote your tour, make sure that it is concise and attractive",
      });
    } else if (data === 17) {
      showArrow = true;
      return renderModalTemplate({
        title: "Tour Description",
        text:
          "Here your customers will get more information about your tour before the buy the tour",
      });
    } else if (data === 18) {
      showArrow = true;
      return renderModalTemplate({
        title: "Tour notes",
        text:
          "please write all the important notes that are important for your customers to know",
      });
    } else if (data === 19) {
      showArrow = true;
      return renderModalTemplate({
        title: "Save & Continue",
        text: "You progress well, save and continue to the next step",
      });
    } else if (data === 20) {
      showArrow = true;
      return renderModalTemplate({
        title: "Next step",
        text: "Navigate to next stop",
      });
    } else if (data === 21) {
      showArrow = true;
      return renderModalTemplate({
        title: "Tour name",
        text: "Let's start with the name of the tour",
      });
    }
  };

  const renderCSS = () => {
    if (data === 10) {
      return "generalModal fieldsModal priceFieldModal";
    } else if (data === 11) {
      return "generalModal fieldsModal difcFieldModal";
    } else if (data === 12) {
      return "generalModal fieldsModal hourFieldModal";
    } else if (data === 13) {
      return "generalModal fieldsModal audFieldModal";
    } else if (data === 14) {
      return "generalModal fieldsModal equFieldModal";
    } else if (data === 15) {
      return "generalModal fieldsModal typeFieldModal";
    } else if (data === 16) {
      return "generalModal fieldsModal mainSentFieldModal";
    } else if (data === 17) {
      return "generalModal fieldsModal fullDescFieldModal";
    } else if (data === 18) {
      return "generalModal fieldsModal notesFieldModal";
    } else if (data === 19) {
      return "generalModal fieldsModal saveFieldModal";
    } else if (data === 20) {
      return "generalModal fieldsModal nextFieldModal";
    }
  };

  const renderMarkerCss = () => {};
  const renderArrowCss = () => {
    if (data === 10) {
      return <div>{renderArrowTemplate(`tourNameArrow`)}</div>;
    } else if (data === 11) {
      return <div>{renderArrowTemplate(`tourLocationArrow`)}</div>;
    } else if (data === 12) {
      return <div>{renderArrowTemplate(`tourHourArrow`)}</div>;
    } else if (data === 13) {
      return <div>{renderArrowTemplate(`tourAudArrow`)}</div>;
    } else if (data === 14) {
      return <div>{renderArrowTemplate(`tourEquArrow`)}</div>;
    } else if (data === 15) {
      return <div>{renderArrowTemplate(`tourTypeArrow`)}</div>;
    } else if (data === 16) {
      return <div>{renderArrowTemplate(`tourMainSentArrow`)}</div>;
    } else if (data === 17) {
      return <div>{renderArrowTemplate(`tourFullDescArrow`)}</div>;
    } else if (data === 18) {
      return <div>{renderArrowTemplate(`tourNotesArrow`)}</div>;
    } else if (data === 19) {
      return <div>{renderArrowTemplate(`tourSaveArrow`)}</div>;
    } else if (data === 20) {
      return <div>{renderArrowTemplate(`stepThirdForm`)}</div>;
    }
  };

  const renderArrowTemplate = (style) => {
    return (
      <div className="arrowTEST">
        <img src={disArrow} className={`instractionArrow ${style}`} alt='instractionArrow'/>
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

export default TourModalInstraction;
