import React from "react";
import { Menu, Segment } from "semantic-ui-react";
import TourForm from "./TourForm";
import TourMedia from "./TourMedia";
import TourFirstForm from "./TourFirstForm";
import PeakProfilePic from "./PeakProfilePic";

const TourDetails = ({
  onFormSubmit,
  ActiveTab,
  setActiveTab,
  displayMedia,
}) => {
  const switchContent = (ActiveTab) => {
    switch (ActiveTab) {
      case "First details":
        return <TourFirstForm onFormSubmit={onFormSubmit} />;
      case "General details":
        return <TourForm onFormSubmit={onFormSubmit} />;
      case "General content":
        return <TourMedia saveChanges={onFormSubmit} />;
      case "Tour profile picture":
        return (
          <PeakProfilePic saveChanges={onFormSubmit} fileType={"tour_image"} />
        );
      default:
        break;
    }
  };

  return (
    <div style={{width:'100%'}}>
      <Menu attached="top" tabular>
        <Menu.Item
          name="First details"
          active={ActiveTab === "First details"}
          onClick={() => setActiveTab("First details")}
        />
        <Menu.Item
          name="General details"
          active={ActiveTab === "General details"}
          onClick={() => setActiveTab("General details")}
        />
       {/*  <Menu.Item
          name="Tour profile files"
          active={ActiveTab === "Tour profile picture"}
          onClick={() => setActiveTab("Tour profile picture")}
        /> */}
        <Menu.Item
          name="Pictures from the tour"
          active={ActiveTab === "General content"}
          onClick={() => setActiveTab("General content")}
        />
      </Menu>
      <Segment attached="bottom">{switchContent(ActiveTab)}</Segment>
    </div>
  );
};

export default TourDetails;
