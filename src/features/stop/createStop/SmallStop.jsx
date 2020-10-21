import React, { useState } from "react";
import SmallStopNav from "./SmallStopNav";
import { Segment } from "semantic-ui-react";
import PeakLocationGeneric from "./PeakLocationGeneric";
import { createStop } from "../stopAction";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import SmallStopMedia from "./SmallStopMedia";
import { generalUploadFile } from "../../media/mediaActions";
import MediaSmallStop from "./MediaSmallStop";

const actions = {
  createStop,
  generalUploadFile,
  //updateStop
};

const mapState = (state, props) => {
  let stop = {};
  let stopId;
  if (props.stopId !== null) {
    stopId = props.stopId;
    if (props.all_stops) {
      stop = props.all_stops.filter((stop) => stop.id === stopId)[0];
    }
  }

  return {
    initialValues: stop,
  };
};

const SmallStop = ({
  setRouteStatus,
  all_stops,
  tourId,
  updateStop,
  createStop,
  setMarker,
  setCenter,
  stopId,
  initialValues,
  generalUploadFile,
  setStopId,
  clickLocation,
  setClickLocation,
  setCurrentStop,
}) => {
  const [tabName, settabName] = useState("Location");

  const handleSubmitOld = async (values) => {
    console.log("add or update stop", values);
    try {
      if (stopId) {
        await updateStop(tourId, values);
      } else {
        let created_stop_id = await createStop(
          values,
          tourId,
          all_stops.length,
          "smallStop"
        );
        //props.change('id', created_stop_id)
        //await updateStop(tourId, values)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      let new_stop = {
        ...values,
        type: "smallStop",
        stop_location: {
          latitude: parseFloat(values.stop_location.latitude),
          longitude: parseFloat(values.stop_location.longitude),
        },
        //all_media: values.all_media ? values.all_media : []
      };
      let current_stopId = await updateStop(new_stop);
      setStopId(current_stopId);
      setCurrentStop(new_stop);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = async (file, title = "file") => {
    let new_media = await generalUploadFile(
      file,
      initialValues.id,
      "stop",
      title
    );
    new_media = {
      ...new_media,
      order: initialValues.all_media ? initialValues.all_media.length : 0,
    };
    let new_all_media = [...initialValues.all_media, new_media];
    let update_stop = {
      ...initialValues,
      all_media: new_all_media,
    };

    handleSubmit(update_stop);
  };

  const uploadWithoutFile = (question) => {
    let new_media = {
      ...question,
      order: initialValues.all_media ? initialValues.all_media.length : 0,
    };
    let new_all_media = [...initialValues.all_media, new_media];
    let update_stop = {
      ...initialValues,
      all_media: new_all_media,
    };

    handleSubmit(update_stop);
  };

  const switchRenderFunction = () => {
    switch (tabName) {
      case "Location":
        return (
          <PeakLocationGeneric
            saveChanges={handleSubmit}
            setRouteStatus={setRouteStatus}
            setMarker={setMarker}
            setCenter={setCenter}
            initialValues={initialValues}
            clickLocation={clickLocation}
            setClickLocation={setClickLocation}
          />
        );
      case "Context":
        if (!stopId) {
          return <div>Please add location first</div>;
        }
        return (
          {
            /* <SmallStopMedia
            saveChanges={handleSubmit}
            tourId={tourId}
            stopId={stopId}
            initialValues={initialValues}
            uploadFile={uploadFile}
            uploadWithoutFile={uploadWithoutFile}
          /> */
          },
          (
            <MediaSmallStop
              saveChanges={handleSubmit}
              stopId={stopId}
              initialValues={initialValues}
              uploadFile={uploadFile}
            />
          )
        );
      default:
        break;
    }
  };

  return (
    <div>
      <div style={{ marginLeft: "2%" }}>Small stop</div>
      <SmallStopNav activeTab={tabName} handleTabChange={settabName} />
      <Segment attached="bottom">{switchRenderFunction()}</Segment>
    </div>
  );
};

export default connect(
  mapState,
  actions
)(
  reduxForm({
    form: "smallStopForm",
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  })(SmallStop)
);
