import React from "react";
import classes from "./Container.module.css";
import Loader from "../Loader/Loader";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Container = ({ children, loading, heading }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={classes.heading}>
            {heading.toLowerCase() !== "sports" && (
              <div>
                <BiArrowBack size={30} onClick={() => navigate(-1)} />
              </div>
            )}
            <h1>{heading}</h1>
          </div>
          {children}
        </>
      )}
    </div>
  );
};

export default Container;
