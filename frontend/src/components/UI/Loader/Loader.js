import React from "react";
import { HashLoader } from "react-spinners";

const Loader = ({ style }) => {
  return <HashLoader color="#0d2c54" style={{ margin: "auto", ...style }} />;
};

export default Loader;
