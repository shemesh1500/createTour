/*global google*/
import React, { Fragment, useState } from "react";
import Mapcomponent from "../../../app/common/map/Mapcompomemtt";
import "../../../style/routePreview.css";
import StopPreview from "./StopPreview";
//import SmallStopPreview from "./SmallStopPreview";
import { FixedSizeList as List } from "react-window";
import MediaModal from "../../../app/common/modal/MediaModal";
import defaultProfile from '../../../images/default-profile.png'
//import { useSelector } from 'react-redux'

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
    tabStatus
  } = props;

  const [previewState, setPreviewState] = useState(false);
  const [previewUrl, setPreviewUrl] = useState();

 // const tabStatus = useSelector(state => state.async.asyncTabStatus)
  

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

  const renderStop = (stop) => {
    if(stop.type.includes('big') || stop.type.includes('business')){
      console.log("LOC_PICS", stop.loc_pics );
      return(
        <div className='bigStopSqure'>
          <div className='stopDetails'>
            <div className='tourName'>{stop.s_title ? stop.s_title : 'Title'}</div>
            <div className='tourType'>{stop.tags ? stop.tags.map(tag=> tag ) : 'Type'}</div>
            <div className='tourClock'>1.0k</div>
          </div>
          <div className='stopPic'>
            <img className='stopImg' src={stop.loc_pics && stop.loc_pics[0] ? stop.loc_pics[0].url : defaultProfile} alt='stopPicture'/>
          </div>
        </div>
      )
    }
    if(stop.type.includes('small')){
      return(
        <div className='smallStopSqure'>
          <div className='smallStopDetails'>
            <div className='tourName'>{stop.s_title ? stop.s_title : 'Title'}</div>
            <div className='tourType'>{stop.tags ? stop.tags.map(tag=> tag + " " ) : 'Type'}</div>
            <div className='tourClock'>1.0k</div>
          </div>
        </div>
      )
    }
  }

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
    
       { tour && (
          <div className="routePreview">
         {places && currentStop && (!currentStop.type.includes('smallStop') && !tabStatus.includes('Location') ) ? 
          <StopPreview stop={currentStop} getPreview={getPreview} /> :
            <Fragment>
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
              <div className='stopsArea'>
                {tour.stops && 
                <List  
                direction="horizontal"
                height={165} 
                itemCount={tour.stops.length}
                itemSize={320}
                width={400}
              >
                 {({ key, index, style }) => (
              <div
              // className={index % 2 ? "ListItemOdd" : "ListItemEven"}
                key={key}
                style={style}
              >
                {renderStop(tour.stops[index])}
               
              </div>
            )}
                </List> }
              </div>
            {/*  <div className="stopsList">
                {places && currentStop ? (
                  
                   <SmallStopPreview stop={currentStop} getPreview={getPreview} />
                ) : (
                  <div className='allStopsButtom'>
                    <div>
                  <List
                    className="List"
                    direction="horizontal"
                    height={55}
                    itemCount={places.length}
                    itemSize={40}
                    width={170}
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
                )}
                    </div>*/}
            </div>
            </Fragment>
}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoutePreview;
