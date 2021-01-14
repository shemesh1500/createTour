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
import InstractionController from "../../instractions/InstractionController";
import PeakProfilePic from "./PeakProfilePic";

/* const query = (props) => {
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
 */
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
  /*   let user = {};
  if (state.firestore.ordered.user) {
    user =
      state.firestore.ordered.users.filter(
        (user) => user.email === state.firebase.auth.email
      )[0] || {};
  } */
  return {
    stops: stops,
    initialValues: tour,
    tourId: tourId,
    tabStatus: state.async.tab_name,
  };
};

const TourControl = (props) => {
  const { initialValues, tourId } = props;
  const [mainNavActive, setMainNav] = useState("Tour Summary");

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
  const [ActiveDetailsTab, setActiveDetailsTab] = useState("First details");

  let bounds;

  const [businessMarker, setbusinessMarker] = useState([]);
  const [SelectedBusiness, setSelectedBusiness] = useState();

  //props.addTourToUser(tourId);

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
    if (props.stops && props.stops[0]) {
      checkStartingPoint(initialValues.stops[0].stop_location);
      renderRoute();
    }
  }, [props.stops, initialValues.stops]);
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
    checkStartingPoint(initialValues.stops[0].stop_location);
    await props.updateTour(initialValues);
    setworkingStop(null);
  };

  const renderRoute = () => {
    let markerStops = [];
    props.stops.forEach((stop) => {
      if (stop.stop_location) {
        markerStops.push({ location: stop.stop_location, order: stop.order });
      }
    });
    setMarkerList(markerStops);
    return;
  };

  const updateAllStops = async (all_stops) => {
    initialValues.stops = all_stops;
    await props.updateTour(initialValues);
  };

  const displayMedia = () => {
    console.log("display media", initialValues);
    /*return (
       <PeakProfilePic
        all_media={initialValues.all_media}
        tourID={initialValues.id}
        updateTour={props.updateTour}
        tour={initialValues}
      /> 
    );*/
  };

  /* Rendering the main area of the cteation of the tour */
  const renderMainNav = () => {
    switch (mainNavActive) {
      /* case "Main Location":
        return (
          <PeakMainLocation
            saveChanges={onPeakAddSubmit}
            setZoom={setZoom}
            setCenter={setCenter}
            setSelectMarker={setClickMarker}
          />
        ); */
      case "Tour Summary":
        return (
          <TourDetails
            onFormSubmit={onFormSubmit}
            ActiveTab={ActiveDetailsTab}
            setActiveTab={setActiveDetailsTab}
            displayMedia={displayMedia}
          />
        );
      /*  case "Tour profile picture":
        return (
          <PeakProfilePic
            all_media={initialValues.all_media}
            tourID={initialValues.id}
            updateTour={props.updateTour}
            tour={initialValues}
          />
        ); */
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
        props.change("id", tour.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFormSubmit = async (values) => {
    try {
      if (props.initialValues.id) {
        props.updateTour(values);
      } else {
        let createdTour = await props.createTour(values);
        props.change("id", createdTour.id);
        //props.updateTour(values);
        //console.log("updateTour", );
        props.history.push(`/tourControl/${createdTour.id}`);
        console.log("initial after push", props.initialValues);
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
      initialValues.starting_point.latitude !== starting_point.latitude ||
      initialValues.starting_point.longitude !== starting_point.longitude
    ) {
      initialValues.starting_point = starting_point;
      doUpdate = true;
    }

    if (initialValues.distance !== Distance && Distance !== 0) {
      initialValues.distance = Distance;
      doUpdate = true;
    }
    if (initialValues.durationCalc !== Duration && Duration !== 0) {
      initialValues.durationCalc = Duration;
      doUpdate = true;
    }
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
            defaultZoom={mapZoom}
            bounds={bounds}
            defaultCenter={mapCenter}
            setCenter={setCenter}
            handleClickMap={handleClickMap}
          />
        );
      case "Tour Summary":
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
            tabStatus={props.tabStatus}
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

  /*Start Instraction modal */
  const [showInstraction, setShowInstraction] = useState(false);

  const renderInstraction = () => {
    console.log("RENDER INSTRACTION");
    switch (mainNavActive) {
      case "Tour Summary":
        switch (ActiveDetailsTab) {
          case "First details":
            return setShowInstraction("firstForm");
          case "General details":
            return setShowInstraction("tourInstraction");
          case "General content":
            return setShowInstraction("tourMediaInstraction");
          default:
            return;
        }
      default:
        return setShowInstraction("firstForm");
    }
  };
  useEffect(() => {
    if (showInstraction !== false) {
      renderInstraction();
    }
  }, [mainNavActive, ActiveDetailsTab]);
  /*End Instraction modal */

  return (
    <div className="controlArea">
      <div className="contextArea">
        <div className="mainTourHeader">Tour Details</div>
        <div className="subTourHeader">Here you start to build your tour</div>
        <div className="getInstraction" onClick={() => renderInstraction()}>
          Get some help
        </div>
        <TourMainNav
          activeTab={mainNavActive}
          handleTabChange={handleMainNavClick}
        />
        <InstractionController
          showInstraction={showInstraction}
          setShowInstraction={setShowInstraction}
        />
        <div>{renderMainNav()}</div>
      </div>
      <div className="mapArea">{renderMainWorkZone()}</div>
    </div>
  );
};

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
