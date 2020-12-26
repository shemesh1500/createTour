import React, {useEffect, useState} from "react";
import styled, { css } from "styled-components";
import makeCarousel from "react-reveal/makeCarousel";
import Slide from "react-reveal/Slide";
import locationIcon from "../../../images/location.png";
import durationIcon from "../../../images/duration.png";
import distanceIcon from "../../../images/distance.png";
import rangeIcon from "../../../images/range.png";
import userIcon from "../../../images/userIcon.jpg"
import { FixedSizeList as List } from "react-window";
import {  Rating } from "semantic-ui-react";
import "../../../style/tourPreview.css";
import { connect } from "react-redux";

const mapState = (state, props) => {
  let user = {};
  if (state.firestore.ordered.users) {
    user = state.firestore.ordered.users[0];
  }
  return {
    //tourId: props.tourId,
    tour: state.form.tourForm.values,
    user:user
  };
};

const TourPreview = (props) => {
  const { tour, user } = props;
  const width = "300px",
    height = "150px";

  const Container = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 400px !important;
     
  `;
  const Children = styled.div`
    position: center;
  `;
  const Dot = styled.span`
    font-size: 2.5em;
    font-color: #e8e7e7;
    cursor: pointer;
    text-shadow: 2px 2px 2px #fff;

    user-select: none;
  `;
  const Dots = styled.span`
    position: absolute;
    bottom: 15px;
    width: ${width};
    z-index: 100;
    display: flex;
    align-items: left;
    justify-content: left;
    padding-left: 20px;
    padding-bottom: 8%;
  `;

  const CarouselUI = ({ position, total, handleClick, children }) => (
    <Container>
      <Children>{children}</Children>
      <Dots>
        {Array(...Array(total)).map((val, index) => (
          <Dot key={index} onClick={handleClick} data-position={index}>
            {index === position ? "● " : "○"}
          </Dot>
        ))}
      </Dots>
    </Container>
  );
  const Carousel = makeCarousel(CarouselUI);

  const renderLive = (index, style, user) => {
    switch (index) {
      case 0:
        const trailer = tour.all_media ? tour.all_media.find(media => media.type.includes("video")) : null
        if(trailer){
          return(
            <video
            poster={trailer.poster_url}
            width="100%"
            hight="100%"
            controls>
            <source src={trailer.url} type={trailer.type} />
          </video>
          )
        }
        if(false){
        return (
          <Carousel defaultWait={0} /*wait for 1000 milliseconds*/>
            {tour.all_media &&
              tour.all_media
                .slice(0)
                .reverse()
                .map((media) => {
                  if (media.type.includes("image")) {
                    return (
                      <Slide right id={`${media.name}`}>
                        <img className="img" src={media.url} alt="airbaloon" />
                      </Slide>
                    );
                  }
                  if (media.type.includes("video")) {
                    return (
                      <Slide right id={`${media.name}`}>
                        <video
                          poster={media.poster_url}
                          width="100%"
                          hight="100%"
                          controls
                        >
                          <source src={media.url} type={media.type} />
                        </video>
                      </Slide>
                    );
                  }
                })}
          </Carousel>

        );}
      case 1:
        return (
          <div className="topHeader">
            <div>
              <div className="tourRate">
                {tour.rating && (
                  <Rating
                    icon="star"
                    defaultRating={tour.rating.total + 1}
                    maxRating={5}
                    disabled
                    size="large"
                    className="ratingStar"
                  />
                )}{" "}
                {tour.rating && tour.rating.votes}{" "}
              </div>
              <div className="tourName">{tour.title && tour.title}</div>
              
          <div className='tourMainSentense'>{tour.main_sentense && tour.main_sentense}</div>
            </div>
            <div>
              <div className="tourType">
                {tour.type && tour.type.map((type) => type + "/")}
              </div>
              <div className="tourPrice">{tour.price && tour.price}</div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="DetailNguide">
          <div className="subHeader">
            <div className="iconItem">
              <img src={locationIcon} alt="Location" />
              <div className="tourLocation">
                {tour.location && tour.location}
              </div>
            </div>
            <div className="iconItem">
              <img src={distanceIcon} alt="distanse" />
              <div className="tourDistance">
                {tour.distance &&
                  Number((tour.distance / 1.6 / 1000).toFixed(2))}
                K
              </div>
            </div>
            <div className="iconItem">
              <img src={durationIcon} alt="duration" />
              <div className="tourDuration">
                {tour.duration && Number((tour.duration / 60).toFixed(2))} min
              </div>
            </div>

            <div className="iconItem">
              <img src={rangeIcon} alt="difficulty" />
              <div className="tourDifficulty">
                {tour.difficulty && tour.difficulty.min} -{" "}
                {tour.difficulty && tour.difficulty.max}
              </div>
            </div>
          </div>
          <div className="guideArea">
            <div className="guidePreview">
              <div className="guideInfo">
                <div className='guidePic'>
                  <img src={userIcon} alt='guidePic' />
                </div>
                <div className='guideName'>{user.displayName ? user.displayName : 'Your name'}</div>
                <div className='viewProfile'>Profile page </div>
              </div>
              <div className="guideRate">
                <Rating
                    icon="star"
                    defaultRating={4.5}
                    maxRating={5}
                    disabled
                    size="large"
                    className="ratingStar"
                  />
                  </div>
            </div>
            <div className="goProfile"></div>
          </div>
          </div>
        );
      case 2:
        //NOT SHOWN IN THE PREVIEW
        return (
          <div className="guideArea">
            <div className="guidePreview">
              <div className="guideInfo">
                <div className='guidePic'>
                  <img src={userIcon} alt='guidePic' />
                </div>
                <div className='guideName'>{user.displayName ? user.displayName : 'Your name'}</div>
                <div className='viewProfile'>Profile page </div>
              </div>
              <div className="guideRate">
                <Rating
                    icon="star"
                    defaultRating={4.5}
                    maxRating={5}
                    disabled
                    size="large"
                    className="ratingStar"
                  />
                  </div>
            </div>
            <div className="goProfile"></div>
          </div>
        );
      case 3:
        return(
          <div className='imgCarousel'>
          <Carousel defaultWait={0} /*wait for 1000 milliseconds*/>
            {tour.all_media &&
              tour.all_media
                .slice(0)
                .reverse()
                .map((media) => {
                  if (media.type.includes("image")) {
                    return (
                      <Slide right id={`${media.name}`}>
                        <img className="tourImg" src={media.url} alt="airbaloon" />
                      </Slide>
                    );
                  }
                })}
          </Carousel>
          </div>
        )
      case 4:
        return (
          <div className="tourDescription">
            <div className="descHeader">Tour Dscription</div>
            <div className="tourDesc">
              {tour.description && tour.description}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="tourNotes">
            <div className="notesHeader">Important Notes</div>
            <div className="tourNote">{tour.notes && tour.notes}</div>
          </div>
        );
      case 6:
        return <div className="pruchaseButton">Pruchase</div>;
      default:
        return null;
    }
  };

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    /* return {
      width,
      height
    }; */
    return height
  }

  /* const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); */
  

  return (
    <div className="previewArea">
      {tour && (
        <div className="tourPreview">
          <List
            //className="List"
            height={getWindowDimensions()/1.7}
            itemCount={7} 
            itemSize={220}
            width={'100%'}
          >
            {
              ({ key, index, style }) =>
                //<div
                //className={index % 2 ? "ListItemOdd" : "ListItemEven"}
                // key={key}
                // style={style}
                // >
                <div style={{...style }}> {renderLive(index, style, user)}</div>
              //</div>
            }
          </List>
        </div>
      )}
    </div>
  );
};

export default connect(mapState)(TourPreview);
