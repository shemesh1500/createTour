import React from "react";
import file_url from "../../images/TandC.pdf";

const CandT = () => {
  const style1 = {
    width: "100%",
    height: "100%",
    padding: "0",
    margin: "0",
  };
  return (
    <iframe
      src={`${file_url}`}
      frameborder="0"
      height="1080px"
      width="100%"
    ></iframe>
  );
};

export default CandT;
