import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../../../style/lists.css";

const BusinessList = (props) => {
  console.log(props.business);
  return (
    <Fragment>
      <div className="allList">
        <div className="mainHeaderList">Business</div>
        <div className="allItmList">
          {props.business &&
            props.business.map((business) => (
              <div className="listItem" key={business.id}>
                <div className="itemHeader">
                  {business.business_name && business.business_name}
                </div>
                <div className="itemAddress">
                  {business.location && business.location}
                </div>
                <div className="itemType">
                  {business.business_type &&
                    business.business_type.map((type) => <span>{type} </span>)}
                </div>
                <div className="itemType">
                  Price: {business.offer_price && business.offer_price}
                </div>
                <Link to={`/businessCreation/${business.id}`}>
                  <button className="editButton">Edit</button>
                </Link>
                {props.doApprov && (
                  <button
                    onClick={() => props.approveBusiness(business)}
                    className="editButton"
                  >
                    Approve
                  </button>
                )}
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default BusinessList;
