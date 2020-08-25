import React, { useState } from "react";
import "./businessModalInstraction.css";
import TourModalInstraction from "./TourModalInstraction";
import { useEffect } from "react";
import BusinessModalInstraction from "./BusinessModalInstraction";
import FirstTourForm from "./FirstTourForm";

const InstractionController = (props) => {
  const { showInstraction, data, setShow, setShowInstraction } = props;
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
    setInstractionStep(1);
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
      {wanted_instraction === "tourFirst" && (
        <TourModalInstraction
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
