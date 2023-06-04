import React from "react";
import classes from "./CardWrapper.module.css";

const CardWrapper = ({ children }) => {
  return <div className={classes.cardWrapper}>{children}</div>;
};

export default CardWrapper;
