import React, { useState } from "react";
import "./style/EditMarkerForm.css";
import axios from "axios";
import { observer } from "mobx-react";
import { useMarkersStore } from "../store/hooks";

const EditMarkerForm = ({ id }) => {
  const { markers, setMarkers } = useMarkersStore();
  const [pointName, setPointName] = useState(
    markers.find((marker) => marker._id === id).pointName
  );
  const [description, setDescription] = useState(
    markers.find((marker) => marker._id === id).description
  );
  const [authorRate, setRate] = useState(
    markers.find((marker) => marker._id === id).authorRate
  );

  const handleOnChangePointName = (e) => setPointName(e.target.value);
  const handleOnChangeDescription = (e) => setDescription(e.target.value);
  const handleOnChangeRate = (e) => setRate(e.target.value);
  const handleOnSubmitEditMarkerForm = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/markers/editmarker", {
        id,
        pointName,
        description,
        authorRate,
      })
      .then(function (res) {
        if ((res.statusText = "OK")) {
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

  return (
    <form className="marker-edit-form" onSubmit={handleOnSubmitEditMarkerForm}>
      <input
        className="marker-edit-input"
        type="text"
        placeholder="Nazwa znacznika"
        value={pointName}
        onChange={handleOnChangePointName}
      />
      <textarea
        className="marker-edit-ta"
        type="text"
        placeholder="Opis"
        value={description}
        onChange={handleOnChangeDescription}
      ></textarea>
      <label className="marker-edit-label">
        {" "}
        Twoja ocena
        <select value={authorRate} onChange={handleOnChangeRate}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <input className="marker-edit-btn" type="submit" value="Edytuj" />
    </form>
  );
};

export default observer(EditMarkerForm);
