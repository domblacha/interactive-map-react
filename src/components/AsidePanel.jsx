import React from "react";
import "./style/AsidePanel.css";

import AddMarkerForm from "./AddMarkerForm";

const AsidePanel = ({ aside, latitude, longitude, clickClose }) => {
  return (
    <div className={aside ? "info info--active" : "info"}>
      <button className="info__close-btn" onClick={clickClose}>
        Zamknij
      </button>
      <p className="info__title">Dodawanie znacznika</p>
      <AddMarkerForm latitude={latitude} longitude={longitude} />
    </div>
  );
};

export default AsidePanel;
