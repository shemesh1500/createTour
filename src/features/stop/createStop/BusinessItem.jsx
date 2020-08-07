import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./businessStyle.css";
import { Grid, Header } from "semantic-ui-react";

const BusinessItem = (props) => {
  const { business, addBusinessToRoute } = props;
  const tagByType = (item) => {
    // console.log("Switch", item.type)
    if (item.type.includes("image")) {
      return (
        //  <Grid.Column centered>
        <img width="180" hight="180" src={item.url} />
        // </Grid.Column>
      );
    } else if (item.type.includes("audio")) {
      return (
        // <Grid.Column>
        <audio width="320" height="180" controls>
          <source src={item.url} type={item.type} />
        </audio>
        //</Grid.Column>
      );
    } else if (item.type.includes("video")) {
      return (
        //<Grid.Column>
        <video poster={item.poster_url} width="260" hight="180" controls>
          <source src={item.url} type={item.type} />
        </video>
        //</Grid.Column>
      );
    }
  };

  const formatHours = (secs) => {
    if (secs === 86400) secs = 86360;
    var minutes = Math.floor(secs / 60);
    var hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    /*
        var amPm = hours > 11 ? "PM" : "AM";
        if (secs < 3600) {
          hours = 12;
        } else if (hours > 12) {
          hours -= 12;
        }
        return `${hours}:${("0" + minutes).slice(-2)} ${amPm}`;
        */
    return `${hours}:${("0" + minutes).slice(-2)}`;
  };

  return (
    <div className="businessItem" key={business.business_number}>
      <div>
        <div className="businessTitle">Business card:</div>
        <div className="businessItemTop">
          <div className="oneUnit">
            <div className="businessItemHeader">Name:</div>
            <div className="businessName">{business.business_name}</div>
          </div>
          <div className="oneUnit">
            <div className="businessItemHeader">Type:</div>
            <div className="businessName">{business.business_type}</div>
          </div>
          <div className="oneUnit">
            <div className="businessItemHeader">Price:</div>
            <div className="businessName">{business.offer_price}</div>
          </div>
        </div>
        <div className="businessItemTop">
          <div className="oneUnit">
            <div className="businessItemHeader">Age range:</div>
            {business.age_range && (
              <div className="businessName">
                {business.age_range.min} - {business.age_range.max}
              </div>
            )}
          </div>
          <div className="oneUnit">
            <div className="businessItemHeader">Available hours:</div>
            {business.hours_range && (
              <div className="businessName">
                {formatHours(business.hours_range.min)} -{" "}
                {formatHours(business.hours_range.max)}
              </div>
            )}
          </div>
        </div>
        <div className="oneUnit">
          <div className="businessItemHeader">Language:</div>
          <div className="bigText">{business.business_language}</div>
        </div>
        <div className="oneUnit">
          <div className="businessItemHeader">About us:</div>
          <div className="bigText">{business.description}</div>
        </div>
        <div className="oneUnit">
          <div className="businessItemHeader">The offer:</div>
          <div className="bigText">{business.offer_in_details}</div>
        </div>
        <div className="oneUnit">
          <div className="businessItemHeader">Address:</div>
          <div className="bigText">{business.location}</div>
        </div>
      </div>
      <div className="businessMediaArea">
        {business.all_media &&
          business.all_media.map((media) => (
            <div className="mediaItemBusiness"> {tagByType(media)} </div>
          ))}
      </div>

      {addBusinessToRoute && (
        <button
          className="saveButton"
          onClick={() => addBusinessToRoute(business)}
        >
          Add this business stop to my tour
        </button>
      )}
    </div>
  );
};

export default BusinessItem;
