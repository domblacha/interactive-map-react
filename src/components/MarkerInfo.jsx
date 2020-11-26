import React from "react";
import { observer } from "mobx-react";
import { useMarkersStore } from "../store/hooks";

const MarkerInfo = ({ activeMarkerId }) => {
  const { markers } = useMarkersStore();
  return markers.map((marker) => {
    if (marker._id === activeMarkerId) {
      return (
        <div className="comment-info__container" key={marker._id}>
          <p className="comment-info__author">
            Dodane przez: {marker.authorName} {marker.authorSurname}
          </p>
          <p className="comment-info__rate">
            Ocena autora: {marker.authorRate}
          </p>
          <p className="comment-info__point-name">{marker.pointName}</p>
          <p className="comment-info__desc-label">Opis:</p>
          <p className="comment-info__desc">{marker.description}</p>
          <p className="comment-info__title-comm">Wszystkie komentarze:</p>
        </div>
      );
    }
    return null;
  });
};

export default observer(MarkerInfo);
