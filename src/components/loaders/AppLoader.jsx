import React from "react";
import "./loader.scss";

const AppLoader = () => {
  return (
    <div className="loadingContainer">
      <div className="spinner">
        <div className="spinner-item"></div>
        <div className="spinner-item"></div>
        <div className="spinner-item"></div>
        <div className="spinner-item"></div>
        <div className="spinner-item"></div>
      </div>
    </div>
  );
};

export default AppLoader;
