import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Dropdown } from "semantic-ui-react";
import CreateStop from "../../stop/stopCreation/CreateStop";
import StopList from "../../stop/stopList/StopList";
import {
  updateStop,
  deleteStop,
  addBusinessStopToRoute,
} from "../../stop/stopAction";
import { useEffect } from "react";
import "../../../style/tourControl.css";
import "../../../style/createRoute.css";
import AddBusinessStop from "../../stop/stopCreation/AddBusinessStop";
import SmallStop from "../../stop/stopCreation/SmallStop";
import BusinessItem from "../../stop/stopCreation/BusinessItem";

const actions = {
  updateStop,
  deleteStop,
  addBusinessStopToRoute,
};

const mapState = (state, props) => {
  return {
    //tourId: props.tourId,
    initialValues: state.form.tourForm.values,
    loading: state.async.loading,
    all_stops: state.firestore.ordered.stops,
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
    setMarkerList,
    mapMarkers,
    deleteStop,
    setbusinessMarker,
    selectedBusiness,
    addBusinessStopToRoute,
    initialValues,
  } = props;

  const [routeStatus, setRouteStatus] = useState("Stops List");
  const [currentStopId, setStopId] = useState(null);
  const [currentStop, setStop] = useState(null);

  useEffect(() => {
    if (all_stops && mapMarkers && all_stops.length > 0) {
      all_stops.map((stop) =>
        setMarkerList([...mapMarkers, stop.stop.location])
      );
    }
  }, [all_stops]);

  const setOrderList = (updated_list) => {
    updated_list.map((stop, index) => (stop.order = index));
  };

  const deleteStopRoute = (stop) => {
    deleteStop(stop);
    all_stops.filter((current_stop) => current_stop.id === stop.id);
    setOrderList(all_stops);
  };

  const AddBusinessToRoute = (business) => {
    addBusinessStopToRoute(business, tourId, all_stops.length);
    setbusinessMarker([]);
  };

  const saveChanges = async () => {
    const tmp = [...all_stops];
    /*firebase.firestore().collection('tours').doc(tourId).collection("stops").get().then((doc) => {
                doc.docs.map(docu => console.log("DOC", docu.id));
                if (doc.exists) {
            } else {
                console.log("No such document!");
            }
        })*/
    tmp.map((stop) => updateStop(tourId, stop)); // updateStop(tourId, stop)))
    let markerStops = [];
    all_stops.sort((a, b) => a.order > b.order);
    await checkStartingPoint(all_stops[0].stop_location);
    //if (initialValues.first_stop && initialValues.first_stop !== all_stops[0].stop_location)
    all_stops.map(
      (stop) =>
        (markerStops = [
          ...markerStops,
          { location: stop.stop_location, order: stop.order },
        ])
    );
    setMarkerList(markerStops);
  };

  const renderStopFunc = (item) => {
    return (
      <div className="stopCard">
        <div>
          <h4>{item.order + 1}</h4>
        </div>
        <div>
          <h4>{item.location}</h4>
        </div>
        <div>
          <Button.Group>
            <Button onClick={() => deleteStopRoute(item)}>Delete</Button>
            <Button.Or />
            <Button
              positive
              onClick={() => {
                setStopId(item.id);
                setRouteStatus("Edit Stop");
                setStop(item);
              }}
            >
              Edit
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
            handleDeleteStop={handleDeleteStop}
          />
        )}
        <button className="saveButton" onClick={saveChanges}>
          Save Changes
        </button>
      </div>
    );
  };

  const createNewStop = () => {
    console.log("create stop", currentStopId, tourId);
    if (tourId) {
      return (
        <CreateStop
          setMarker={setMarker}
          setCenter={setCenter}
          tourId={tourId}
          stopId={currentStopId}
          all_stops={all_stops}
          setRouteStatus={setRouteStatus}
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
          console.log("tour Status", currentStop);
          return (
            <SmallStop
              setMarker={setMarker}
              setCenter={setCenter}
              tourId={tourId}
              stopId={currentStopId}
              all_stops={all_stops}
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
            stopId={null}
            all_stops={all_stops}
          />
        );
      default:
        break;
    }
  };

  const options = [
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
          <div className="subHeaderRoute">
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
              onClick={() => setRouteStatus("Stops List")}
            >
              {" "}
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
