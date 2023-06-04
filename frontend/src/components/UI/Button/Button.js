import React from "react";
import classes from "./Button.module.css";

const Button = ({ onClick, children, style }) => {
  return (
    <button className={classes.btn} style={{ ...style }} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
