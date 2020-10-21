import React, { useState } from "react";
import { Segment } from "semantic-ui-react";
import StopCreationNav from "./StopCreationNav";
import PeakLocation from "./PeakLocation";
import StopForm from "./StopForm";
import { createStop, addStopToTour } from "../stopAction";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import StopMedia from "./StopMedia";
import "../../../style/stopCreation.css";

const actions = {
  createStop,
  addStopToTour,
};

const mapState = (state, props) => {
  let stopId;
  let tourId = props.tourId;
  let stop = {};
  if (props.stopId !== null) {
    stopId = props.stopId;
    if (props.all_stops) {
      stop = props.all_stops.filter((stop) => stop.id === stopId)[0];
    }
  }
  return {
    initialValues: stop,
    tourId: tourId,
  };
};

const CreateStop = (props) => {
  const {
    setMarker,
    setCenter,
    tourId,
    updateStop,
    setRouteStatus,
    all_stops,
    setStopId,
    clickLocation,
    setClickLocation,
    setCurrentStop,
  } = props;
  const [tabName, handleTabChange] = useState("Location");

  const handleSubmit = async (values) => {
    try {
      let newStop = {
        ...values,
        stop_location: {
          latitude: parseFloat(values.stop_location.latitude),
          longitude: parseFloat(values.stop_location.longitude),
        },
        type: "bigStop",
      };

      let stop_id = await updateStop(newStop);
      setStopId(stop_id);
      console.log("HandleSybmit");
      setCurrentStop(newStop);
      /*if (values.id) {
                await updateStop(tourId, values)
            }
            else {
                let created_stop_id = await createStop(values, tourId, all_stops.length, 'bigStop')
                //props.change('id', created_stop_id)
                //await updateStop(tourId, values)
            }*/
    } catch (error) {
      console.log(error);
    }
  };

  const switchRenderFunction = () => {
    switch (tabName) {
      case "Location":
        return (
          <PeakLocation
            saveChanges={handleSubmit}
            setMarker={setMarker}
            setCenter={setCenter}
            setRouteStatus={setRouteStatus}
            stop={props.initialValues}
            clickLocation={clickLocation}
            setClickLocation={setClickLocation}
          />
        );
      case "General Info":
        return (
          <StopForm
            saveChanges={handleSubmit}
            setRouteStatus={setRouteStatus}
            stop={props.initialValues}
          />
        );
      case "Media":
        return (
          <StopMedia
            saveChanges={handleSubmit}
            tourId={tourId}
            all_stops={all_stops}
            stop={props.initialValues}
          />
        );
      default:
        break;
    }
  };
  return (
    <div className="allCreation">
      <StopCreationNav activeTab={tabName} handleTabChange={handleTabChange} />
      <Segment attached="bottom">{switchRenderFunction()}</Segment>
    </div>
  );
};

export default connect(
  mapState,
  actions
)(
  reduxForm({
    form: "stopForm",
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  })(CreateStop)
);
