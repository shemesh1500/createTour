/*global google*/
import React, { useState } from "react";
import Mapcomponent from "../../../app/common/map/Mapcompomemtt";
import "../../../style/routePreview.css";
import StopPreview from "./StopPreview";
import { FixedSizeList as List } from "react-window";
import MediaModal from "../../../app/common/modal/MediaModal";

const RoutePreview = (props) => {
  const {
    tour,
    places,
    businessPlaces,
    setSelectedBusiness,
    setDistance,
    setDuration,
    currentStop,
    clickLocation,
    setClickLocation,
  } = props;

  const [previewState, setPreviewState] = useState(false);
  const [previewUrl, setPreviewUrl] = useState();

  const getPreview = (data) => {
    const obj = {
      ...data,
    };
    setPreviewUrl(obj);
    setPreviewState(true);
  };

  const hideModal = () => {
    setPreviewState(false);
  };

  return (
    <div>
      {clickLocation && (
        <button
          onClick={() => setClickLocation(null)}
          style={{
            height: "40px",
            width: "140px",
            cursor: "pointer",
            position: "absolute",
          }}
        >
          Cancle manual peak location
        </button>
      )}

      <div className="previewArea">
        {tour && (
          <div className="routePreview">
            <div className="mapRoute">
              <MediaModal
                show={previewState}
                onHide={hideModal}
                data={previewUrl}
              />
              <Mapcomponent
                places={places}
                businessPlaces={businessPlaces}
                travelMode={google.maps.TravelMode.WALKING}
                setSelectedBusiness={setSelectedBusiness}
                setDistance={setDistance}
                setDuration={setDuration}
                clickLocation={clickLocation}
                setClickLocation={setClickLocation}
              />
            </div>
            <div className="buttomRoute">
              <div className="stopsList">
                {places && currentStop ? (
                  <StopPreview stop={currentStop} getPreview={getPreview} />
                ) : (
                  <List
                    className="List"
                    direction="horizontal"
                    height={55}
                    itemCount={places.length}
                    itemSize={50}
                    width={200}
                  >
                    {({ key, index, style }) => (
                      <div
                        className={index % 2 ? "ListItemOdd" : "ListItemEven"}
                        key={key}
                        style={style}
                      >
                        <div className="stopCircle"> {index + 1} </div>
                      </div>
                    )}
                  </List>
                )}
              </div>
              <div className="routeDetails">
                <div>
                  Distance: {Number((tour.distance / 1600).toFixed(2))}km
                </div>
                <div>
                  Duration: {Number((tour.duration / 60).toFixed(1))}min
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoutePreview;
