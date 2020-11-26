import React, { useState } from "react";
import "./style/UserMarkersList.css";
import axios from "axios";
import { observer } from "mobx-react";
import { useUserStore, useMarkersStore } from "../store/hooks";
import EditMarkerForm from "./EditMarkerForm";

const UserMarkersList = () => {
  const { user } = useUserStore();
  const { markers, setMarkers } = useMarkersStore();
  const [isEdit, setIsEdit] = useState(false);
  const [markerId, setMarkerId] = useState(null);

  const handleOnClickDeleteMarker = (id) => {
    axios
      .post("http://localhost:3001/markers/deletemarker", {
        id,
      })
      .then(function (res) {
        if (res.statusText === "OK") {
          axios
            .get("http://localhost:3001/markers")
            .then((res) => {
              setMarkers(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  const handleOnClickEditMarker = (id) => {
    setIsEdit(true);
    setMarkerId(id);
  };
  const handleOnClickExitEditMarker = () => setIsEdit(false);

  return markers.map((marker) => {
    if (marker.userId === user.id) {
      return (
        <div className="marker-container" key={marker._id}>
          <div className="marker-items">
            <p className="marker-name">{marker.pointName}</p>
            <p className="marker-desc-title">Opis</p>
            <p className="marker-desc">{marker.description}</p>
            <p className="marker-rate">Ocena: {marker.authorRate}</p>
          </div>
          <div className="marker-btns">
            <button
              className="marker-btn"
              onClick={() => handleOnClickDeleteMarker(marker._id)}
            >
              Usuń znacznik
            </button>
            {!isEdit ? (
              <button
                className="marker-btn"
                onClick={() => handleOnClickEditMarker(marker._id)}
              >
                Edytuj znacznik
              </button>
            ) : marker._id === markerId ? (
              <button
                className="marker-btn"
                onClick={() => handleOnClickExitEditMarker(marker._id)}
              >
                Zamknij Edycje
              </button>
            ) : (
              <button
                className="marker-btn"
                onClick={() => handleOnClickEditMarker(marker._id)}
              >
                Edytuj znacznik
              </button>
            )}
          </div>
          {isEdit && marker._id === markerId ? (
            <EditMarkerForm id={markerId} />
          ) : null}
        </div>
      );
    }
    return null;
  });
};

export default observer(UserMarkersList);
