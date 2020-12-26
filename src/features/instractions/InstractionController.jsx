import React, { useState } from "react";
import "./businessModalInstraction.css";
import TourModalInstraction from "./TourModalInstraction";
import { useEffect } from "react";
import BusinessModalInstraction from "./BusinessModalInstraction";
import FirstTourForm from "./FirstTourForm";
import TourMediaInstraction from "./TourMediaInstraction";

const InstractionController = (props) => {
  const { showInstraction, setShowInstraction } = props;
  let wanted_instraction = showInstraction;

  const [instractionStep, setInstractionStep] = useState(1);
  const onNext = () => {
    setInstractionStep(instractionStep + 1);
    //setShowInstraction(true);
  };
  const onPrevious = () => {
    setInstractionStep(instractionStep - 1);
  };
  const onHide = () => {
    setShowInstraction(false);
  };

  useEffect(() => {
    wanted_instraction = showInstraction;
    if (wanted_instraction === "firstForm") {
      setInstractionStep(1);
    } else if (wanted_instraction === "tourInstraction") {
      setInstractionStep(10);
    } else if (wanted_instraction === "tourMediaInstraction") {
      setInstractionStep(20);
    } else {
      onHide();
    }
  }, [showInstraction]);

  let showArrow = false;
  return (
    <div>
      {wanted_instraction === "firstForm" && (
        <FirstTourForm
          show={showInstraction}
          data={instractionStep}
          onHide={onHide}
          onNext={onNext}
          onPrevious={onPrevious}
        />
      )}
      {wanted_instraction === "tourInstraction" && (
        <TourModalInstraction
          show={showInstraction}
          data={instractionStep}
          onHide={onHide}
          onNext={onNext}
          onPrevious={onPrevious}
        />
      )}
      {wanted_instraction === "tourMediaInstraction" && (
        <TourMediaInstraction
          show={showInstraction}
          data={instractionStep}
          onHide={onHide}
          onNext={onNext}
          onPrevious={onPrevious}
        />
      )}
      {wanted_instraction === "BusinessPeakLocation" && (
        <BusinessModalInstraction
          show={showInstraction}
          data={instractionStep}
          onHide={onHide}
          onNext={onNext}
          onPrevious={onPrevious}
        />
      )}
    </div>
  );
};

export default InstractionController;
