import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../../../style/lists.css";

const TourList = (props) => { 

  return (
    <Fragment>
      <div className="allList">
        <div className="mainHeaderList">Tours</div>
        <div className="allItmList">
          {props.tours &&
            props.tours.map((tour) => (
              <div className="listItem" key={tour.id}>
                <div className="itemHeader">{tour.title && tour.title}</div>
                <div className="itemAddress">
                  {tour.location && tour.location}
                </div>
                <div className="itemType">
                  {tour.type && tour.type.map((type) => <span>{type} </span>)}
                </div>
                <div className="itemType">
                  Price: {tour.price && tour.price}
                </div>
                <div className="itemType">
                  Number of stops: {tour.stops && tour.stops.length}
                </div>

                <div className="itemType">
                  Created at:{" "}
                  {tour.created_date && tour.created_date.toDate().toString()}
                </div>
                <div className="itemType">
                  Last update:{" "}
                  {tour.last_update && tour.last_update.toDate().toString()}
                </div>
                <div className="itemType">
                  Approval date:{" "}
                  {tour.approval_date && tour.last_update.toDate().toString()}
                </div>
                <div className="itemType">
                  Owner:{" "}
                  {tour.tour_guide && tour.tour_guide.email
                    ? tour.tour_guide.email
                    : tour.tour_guide.id}
                  {tour.tour_guide && tour.tour_guide.full_name
                    ? " " + tour.tour_guide.full_name
                    : " "}
                </div>

                <Link to={`/tourControl/${tour.id}`}>
                  <button className="editButton">Edit</button>
                </Link>
                {props.doApprov && (
                  <div>
                    <button
                      onClick={() => props.approveTour(tour)}
                      className="editButton"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => props.unApproveTour(tour.id)}
                      className="editButton"
                    >
                      Un approve
                    </button>
                    <button
                      onClick={() => props.deleteTour(tour)}
                      className="editButton"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default TourList;
