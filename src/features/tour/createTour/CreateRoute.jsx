import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Dropdown } from "semantic-ui-react";
import CreateStop from "../../stop/createStop/CreateStop";
import StopList from "../../stop/stopList/StopList";
import { addBusinessStopToRoute } from "../../stop/stopAction";
import { useEffect } from "react";
import "../../../style/tourControl.css";
import "../../../style/createRoute.css";
import AddBusinessStop from "../../stop/createStop/AddBusinessStop";
import SmallStop from "../../stop/createStop/SmallStop";
import BusinessItem from "../../stop/stopCreation/BusinessItem";
import { generalDeleteFile } from "../../media/mediaActions";

const actions = {
  //updateStop,
  //deleteStop,
  addBusinessStopToRoute,
  generalDeleteFile,
};

const mapState = (state, props) => {
  return {
    //tourId: props.tourId,
    initialValues: state.form.tourForm.values,
    loading: state.async.loading,
    all_stops: state.form.tourForm.values.stops,
  };
};

const CreateRoute = (props) => {
  const {
    setMarker,
    setCenter,
    all_stops,
    tourId,
    checkStartingPoint,
    updateStop,
    /*  setMarkerList,
    mapMarkers, */
    deleteStop,
    setbusinessMarker,
    selectedBusiness,
    generalDeleteFile,
    updateAllStops,
    setCurrentStop,
    clickLocation,
    setClickLocation,
  } = props;

  const [routeStatus, setRouteStatus] = useState("Stops List");
  const [currentStopId, setStopId] = useState(null);
  const [currentStop, setStop] = useState(null);

  useEffect(() => {
    setCurrentStop(currentStop);
  }, [currentStopId, currentStop]);

  useEffect(() => {
    setClickLocation(null);
  }, [currentStop, routeStatus]);

  const setOrderList = (updated_list) => {
    updated_list.map((stop, index) => (stop.order = index));
  };

  /* const deleteStopRoute = (stop) => {
    deleteStop(stop);
    all_stops.filter((current_stop) => current_stop.id === stop.id);
    setOrderList(all_stops);
  }; */

  const deleteStopFromRoute = (stop) => {
    stop.all_media.forEach((media) => {
      if (
        media.type.includes("image") ||
        media.type.includes("audio") ||
        media.type.includes("video")
      ) {
        generalDeleteFile(media, stop.id, "stopMedia");
      }
    });
    deleteStop(stop);
    setOrderList(all_stops);
  };

  const AddBusinessToRoute = (business) => {
    const new_business = {
      ...business,
      type: "business",
    };
    updateStop(new_business);
    setbusinessMarker([]);
    setRouteStatus("Stops List");
  };

  const saveChanges = async () => {
    await updateAllStops(all_stops);
    await all_stops.sort((a, b) => a.order > b.order);
    await checkStartingPoint(all_stops[0].stop_location);

    let markerStops = [];
    all_stops.map(
      (stop) =>
        (markerStops = [
          ...markerStops,
          { location: stop.stop_location, order: stop.order },
        ])
    );

    //setMarkerList(markerStops);
    setbusinessMarker([]);
  };

  const renderStopFunc = (item) => {
    return (
      <div className="stopCard">
        <div>
          <h4>{item.order + 1}</h4>
          <div>{item.type.includes("bigStop") && <p>Big stop</p>}</div>
          <div>{item.type.includes("smallStop") && <p>Small stop</p>}</div>
          <div>{item.type.includes("business") && <p>Business</p>}</div>
        </div>

        <div className="stopCardTitle">
          <p>{item.s_title ? item.s_title : "Add name for this stop"}</p>
        </div>

        <div>
          <Button.Group>
            <Button
              onClick={() =>
                window.confirm("Do you want to remove that stop?")
                  ? deleteStopFromRoute(item)
                  : null
              }
            >
              Delete
            </Button>
            <Button.Or />
            <Button
              positive
              onClick={() => {
                setStopId(item.id);
                setRouteStatus("Edit Stop");
                setStop(item);
                setCurrentStop(item);
              }}
            >
              {item.type === "business" ? "View" : "Edit"}
            </Button>
          </Button.Group>
        </div>
      </div>
    );
  };

  const stopsList = () => {
    return (
      <div>
        {all_stops && (
          <StopList
            listItems={all_stops}
            setList={setOrderList}
            renderingFunc={renderStopFunc}
            handleDeleteStop={deleteStopFromRoute}
          />
        )}
        <button className="saveButton" onClick={saveChanges}>
          Save Changes
        </button>
      </div>
    );
  };

  const createNewStop = () => {
    if (tourId) {
      return (
        <CreateStop
          setMarker={setMarker}
          setCenter={setCenter}
          tourId={tourId}
          stopId={currentStopId}
          all_stops={all_stops}
          updateStop={updateStop}
          setStopId={setStopId}
          setRouteStatus={setRouteStatus}
          clickLocation={clickLocation}
          setClickLocation={setClickLocation}
          setCurrentStop={setCurrentStop}
        />
      );
    } else {
      return <div>Peak Main location first</div>;
    }
  };
  const handleDeleteStop = (stop) => {
    deleteStop(stop);
    setOrderList(all_stops);
  };

  const tourStatus = (stopId) => {
    switch (routeStatus) {
      case "Stops List":
        return stopsList();
      case "Create Stop":
        return createNewStop(null);
      case "Edit Stop":
        if (currentStop.type === "bigStop") {
          return createNewStop(stopId);
        } else if (currentStop.type === "businessStop") {
          return (
            <BusinessItem business={currentStop} addBusinessToRoute={null} />
          );
        } else {
          return (
            <SmallStop
              setMarker={setMarker}
              setCenter={setCenter}
              tourId={tourId}
              stopId={currentStopId}
              setStopId={setStopId}
              all_stops={all_stops}
              updateStop={updateStop}
              clickLocation={clickLocation}
              setClickLocation={setClickLocation}
              setCurrentStop={setCurrentStop}
            />
          );
        }
      case "Create Business Stop":
        return (
          <AddBusinessStop
            setbusinessMarker={setbusinessMarker}
            selectedBusiness={selectedBusiness}
            addBusinessToRoute={AddBusinessToRoute}
          />
        );
      case "Add small stop":
        return (
          <SmallStop
            setMarker={setMarker}
            setCenter={setCenter}
            tourId={tourId}
            stopId={currentStopId}
            setStopId={setStopId}
            all_stops={all_stops}
            updateStop={updateStop}
            clickLocation={clickLocation}
            setClickLocation={setClickLocation}
            setCurrentStop={setCurrentStop}
          />
        );
      default:
        break;
    }
  };

  const options = [
    { key: 4, text: "", value: 4 },
    { key: 1, text: "Add main stop", value: 1 },
    { key: 2, text: "Add business stop", value: 2 },
    { key: 3, text: "Add small stop", value: 3 },
  ];
  const handleDropdown = (e, data) => {
    switch (data.value) {
      case 1:
        setRouteStatus("Create Stop");
        return;
      case 2:
        setRouteStatus("Create Business Stop");
        return;
      case 3:
        setRouteStatus("Add small stop");
        return;
      default:
        break;
    }
  };

  return (
    <div className="mainZone">
      <div className="createHeader">
        <div className="createText">
          <div className="mainHeader">Route creation</div>
          <div className="subHeaderStop">
            Here you can build all the points of the tour and arage it as you
            wish
          </div>
        </div>
        <div>
          {routeStatus === "Stops List" && (
            <Dropdown
              className="addNewStop"
              text="Add new stop"
              options={options}
              onChange={handleDropdown}
            />
          )}
          {routeStatus !== "Stops List" && (
            <button
              className="returnStopList"
              onClick={() => (
                setRouteStatus("Stops List"),
                setbusinessMarker([]),
                setStopId(null),
                setStop(null),
                setCurrentStop(null)
              )}
            >
              Return to route
            </button>
          )}
        </div>
      </div>
      {tourStatus()}
    </div>
  );
};

//  export default compose(
//      firestoreConnect(props => query(props)),
//      connect(mapState, actions)
//  )(CreateRoute);
export default connect(mapState, actions)(CreateRoute);
