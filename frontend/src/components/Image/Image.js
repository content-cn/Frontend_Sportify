import React from "react";
import classes from "./Image.module.css";

const Image = ({ image, name, playerPosition, age }) => {
  return (
    <div className={classes.imgContainer}>
      <img src={image} alt={name} height="100%" width="100%" />
      <div>
        <div>{name}</div>
        {age && <p>Age - {age}</p>}
        {playerPosition && <p>Position - {playerPosition}</p>}
      </div>
    </div>
  );
};

export default Image;
