/*global google*/
import React, { useState, useEffect } from "react";
import { firestoreConnect, withFirestore } from "react-redux-firebase";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { createTour, updateTour } from "../tourAction";
import TourMainNav from "./TourMainNav";
import MapComponent from "../../../app/common/map/MapComponent";
import PeakMainLocation from "./PeakMainLocation";
import CreateRoute from "./CreateRoute";
import { toastr } from "react-redux-toastr";
import TourDetails from "./TourDetails";
import cuid from "cuid";
import TourPreview from "./TourPreview";
import RoutePreview from "./RoutePreview";
import "../../../style/tourControl.css";

const query = (props) => {
  let tourId;
  if (props.tourId) {
    tourId = props.tourId;
  } else if (props.initialValues && props.initialValues.tourId) {
    tourId = props.initialValues.tourId;
  }
  if (tourId) {
    return [
      {
        collection: "tours",
        doc: tourId,
      },
    ];
  } else {
    return [{ collection: "tours" }];
  }
};

const actions = {
  createTour,
  updateTour,
};

const mapState = (state, ownProps) => {
  let tourId;
  let stops;
  if (ownProps.match.params.tourId) {
    tourId = ownProps.match.params.tourId;
  } else if (state.form.tourForm && state.form.tourForm.values.id) {
    tourId = state.form.tourForm.values.id;
  }

  let tour = {};

  if (
    state.firestore.ordered.tours &&
    state.firestore.ordered.tours.length > 0
  ) {
    tour =
      state.firestore.ordered.tours.filter((tour) => tour.id === tourId)[0] ||
      {};
    stops = tour.stops;
    if (stops) {
      stops.sort((a, b) => a.order > b.order);
    }
  }
  return {
    stops: stops,
    initialValues: tour,
    tourId: tourId,
  };
};

const TourControl = (props) => {
  const { initialValues, tourId } = props;
  const [mainNavActive, setMainNav] = useState("Tour Editor");

  const [markerList, setMarkerList] = useState([]);
  const [clickMarker, setClickMarker] = useState(null);
  const [mapCenter, setCenter] = useState({ lat: 15.0, lng: 15.0 });
  const [mapZoom, setZoom] = useState(0);
  const [Distance, setDistance] = useState(0);
  const [Duration, setDuration] = useState(0);
  const [workingStop, setworkingStop] = useState(
    initialValues.stops ? initialValues.stops[0] : null
  );
  const [clickLocation, setClickLocation] = useState(null);

  let all_stop = initialValues.stops ? initialValues.stops : [];
  let bounds;

  const [businessMarker, setbusinessMarker] = useState([]);
  const [SelectedBusiness, setSelectedBusiness] = useState();

  /* useEffect functions */
  async function setListener(firestore) {
    await firestore.setListener({
      collection: "tours",
      doc: tourId,
    });
  }
  async function unSetListener(firestore) {
    await firestore.unsetListener({
      collection: "tours",
      doc: tourId,
    });
  }

  useEffect(() => {
    const { firestore } = props;
    if (tourId) {
      setListener(firestore);
    }

    return () => {
      unSetListener(firestore);
    };
  });

  useEffect(() => {
    if (initialValues && initialValues.main_location) {
      setCenter(initialValues.main_location);
      setZoom(17);
      setClickMarker(initialValues.main_location);
    }

    if (props.stops && props.stops.length !== 0) {
      setCenter(props.stops[0].stop_location);
      setZoom(7);
    }
  }, [props, initialValues]);

  useEffect(() => {
    console.log("useeffect in");
    if (props.stops) {
      checkStartingPoint(initialValues.stops);
      renderRoute();
    }
  }, [props.stops]);
  /* useEffect end*/

  /*block user from continue without create tour object first */
  const handleMainNavClick = (value) => {
    if (tourId) {
      setMainNav(value);
    } else {
      toastr.error("Enter tour name", "Please enter your tour name");
    }
  };

  const updateStop = async (update_stop) => {
    let wanted_stop = initialValues.stops.filter(
      (stop) => stop.id === update_stop.id
    )[0];
    if (wanted_stop) {
      initialValues.stops = initialValues.stops.map((stop) =>
        stop.id === update_stop.id ? update_stop : stop
      );
      await props.updateTour(initialValues);
    } else {
      update_stop = {
        ...update_stop,
        order: initialValues.stops.length,
        id: cuid(),
        all_media: [],
        created_date: new Date(),
        loc_pics: [],
      };
      let updated_stops = [...initialValues.stops, update_stop];
      let updated_tour = {
        ...initialValues,
        stops: [...updated_stops],
      };
      await props.updateTour(updated_tour);
      setworkingStop(update_stop);
    }
    return update_stop.id;
  };

  const deleteStop = async (wanted_stop) => {
    initialValues.stops = initialValues.stops.filter(
      (stop) => stop.id !== wanted_stop.id
    );
    checkStartingPoint(initialValues.stops);
    await props.updateTour(initialValues);
    setworkingStop(null);
  };

  const renderRoute = () => {
    let markerStops = [];
    props.stops.map((stop) =>
      markerStops.push({ location: stop.stop_location, order: stop.order })
    );
    setMarkerList(markerStops);
  };

  const updateAllStops = async (all_stops) => {
    initialValues.stops = all_stops;
    await props.updateTour(initialValues);
    renderRoute();
  };

  /* Rendering the main area of the cteation of the tour */
  const renderMainNav = () => {
    switch (mainNavActive) {
      case "Main Location":
        return (
          <PeakMainLocation
            saveChanges={onPeakAddSubmit}
            setZoom={setZoom}
            setCenter={setCenter}
            setSelectMarker={setClickMarker}
          />
        );
      case "Tour Editor":
        return <TourDetails onFormSubmit={onFormSubmit} />;
      case "Create Route":
        if (tourId) {
          return (
            <CreateRoute
              setMarker={setClickMarker}
              setCenter={setCenter}
              markerList={markerList}
              setMarkerList={setMarkerList}
              defaultCenter={mapCenter}
              defaultZoom={mapZoom}
              tourId={tourId}
              checkStartingPoint={checkStartingPoint}
              addStopToTour={addStopToTour}
              setbusinessMarker={setbusinessMarker}
              updateStop={updateStop}
              updateAllStops={updateAllStops}
              selectedBusiness={SelectedBusiness}
              deleteStop={deleteStop}
              setCurrentStop={setworkingStop}
              clickLocation={clickLocation}
              setClickLocation={setClickLocation}
            />
          );
        } else {
          return <h1>Please create main location please</h1>;
        }
      default:
        break;
    }
  };

  const addStopToTour = (all_stops, newStop) => {
    const updated_stops = [...all_stops, newStop];
    props.change("all_stops", updated_stops);
  };

  const onPeakAddSubmit = async (values) => {
    try {
      if (values.id) {
        this.props.updateStop(values);
      } else {
        let tour = await props.createTour(values);
        props.history.push(`/tourControl/${tour.id}`);
        // setMarkerList({ location: values.main_location , order: 100 })
        props.change("id", tour.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFormSubmit = async (values) => {
    try {
      if (props.initialValuesstops.id) {
        props.updateTour(values);
        props.handleEditStat(false);
      } else {
        let createdTour = await props.createTour(values);
        props.change("id", createdTour.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickMap = (e) => {
    if (mainNavActive === "Main Location") {
      let location = { lat: e.lat, lng: e.lng, color: "red" };
      setClickMarker(location);
      setCenter(location);
      try {
        props.change("main_location", location);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const checkStartingPoint = async (starting_point) => {
    let doUpdate = false;
    if (
      initialValues.starting_point.lat !== starting_point.lat ||
      initialValues.starting_point.lng !== starting_point.lng
    ) {
      initialValues.starting_point = starting_point;
      doUpdate = true;
    }

    if (initialValues.distance !== Distance && Distance !== 0) {
      initialValues.distance = Distance;
      doUpdate = true;
    }
    if (initialValues.duration !== Duration && Duration !== 0) {
      initialValues.duration = Duration;
      doUpdate = true;
    }
    console.log("DoUpload", doUpdate);
    if (doUpdate === true) {
      await props.updateTour(initialValues);
    }
  };

  const renderMainWorkZone = () => {
    switch (mainNavActive) {
      case "Tour Medi1":
        return <div>Media</div>;
      case "Main Location1":
        return (
          <MapComponent
            travelMode={google.maps.TravelMode.WALKING}
            selectedMarker={clickMarker}
            markerList={markerList}
            zoom={mapZoom}
            bounds={bounds}
            center={mapCenter}
            setCenter={setCenter}
            handleClickMap={handleClickMap}
          />
        );
      case "Tour Editor":
        return <TourPreview /*tour={initialValues}*/ />;
      case "Create Route":
        return (
          <RoutePreview
            tour={initialValues}
            places={markerList}
            businessPlaces={businessMarker}
            setSelectedBusiness={setSelectedBusiness}
            setDistance={setDistance}
            setDuration={setDuration}
            currentStop={workingStop}
            clickLocation={clickLocation}
            setClickLocation={setClickLocation}
          />
        );
      default:
        return <TourPreview tour={initialValues} />;
      /*return (<Mapcomponent
                    places={markerList}
                    businessPlaces={businessMarker}
                    travelMode={google.maps.TravelMode.WALKING}
                    setSelectedBusiness={setSelectedBusiness}
                    setDistance={setDistance}
                    setDuration={setDuration}
                />
                )*/
    }
  };
  return (
    <div className="controlArea">
      <div className="contextArea">
        <div className="mainTourHeader">Tour Details</div>
        <div className="subTourHeader">Here you start to build your tour</div>
        <TourMainNav
          activeTab={mainNavActive}
          handleTabChange={handleMainNavClick}
        />
        {renderMainNav()}
      </div>
      <div className="mapArea">{renderMainWorkZone()}</div>
    </div>
  );
};

/*
export default compose(
    connect(mapState, actions),
    firestoreConnect(props => query(props)),
    reduxForm(
        {
            form: 'tourForm',
            enableReinitialize: true,
            destroyOnUnmount: false,
            forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
        })
)(TourControl);
*/

export default withFirestore(
  connect(
    mapState,
    actions
  )(
    reduxForm({
      form: "tourForm",
      enableReinitialize: true,
      destroyOnUnmount: false,
      forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    })(firestoreConnect([{ collection: "tours" }])(TourControl))
  )
);