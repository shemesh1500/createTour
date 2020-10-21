import React from "react";
import file_url from "../../images/TandC.pdf";

const CandT = () => {
  return (
    <iframe
      title="Terms of service"
      src={`${file_url}`}
      frameborder="0"
      height="1080px"
      width="100%"
    ></iframe>
  );
};

export default CandT;
