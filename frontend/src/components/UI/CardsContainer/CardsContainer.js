import React from "react";
import classes from "./CardsContainer.module.css";

const CardsContainer = ({ children }) => {
  return <div className={classes.cardsContainer}>{children}</div>;
};

export default CardsContainer;
