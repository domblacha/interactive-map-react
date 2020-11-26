import React, { useState } from "react";
import "./style/AddMarkerForm.css";
import axios from "axios";
import { observer } from "mobx-react";
import { useMarkersStore, useUserStore } from "../store/hooks";

const AddMarkerForm = ({ longitude, latitude }) => {
  const { user } = useUserStore();
  const { name, surname, id } = user;
  const { setMarkers } = useMarkersStore();
  const [pointName, setPointName] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState("5");

  const handleOnChangePointName = (e) => setPointName(e.target.value);
  const handleOnChangeDesc = (e) => setDescription(e.target.value);
  const handleOnChangeRate = (e) => setRate(e.target.value);

  const handleOnSubmitMarker = (e) => {
    e.preventDefault();
    if ((longitude !== 0) & (latitude !== 0)) {
      axios
        .post("http://localhost:3001/markers/addmarker", {
          userId: id,
          latitude,
          longitude,
          name,
          surname,
          pointName,
          description,
          rate,
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
    }
    setPointName("");
    setDescription("");
    setRate("5");
  };
  return (
    <form className="add-marker-form" onSubmit={handleOnSubmitMarker}>
      <label className="add-marker-label">Dodajesz jako:</label>
      <input
        className="add-marker-input"
        defaultValue={name}
        type="text"
        placeholder="Imię"
        readOnly
      />
      <input
        className="add-marker-input"
        defaultValue={surname}
        type="text"
        placeholder="Nazwisko"
        readOnly
      />
      <input
        className="add-marker-input"
        value={pointName}
        onChange={handleOnChangePointName}
        type="text"
        placeholder="Nazwa punktu"
      />
      <textarea
        className="add-marker-ta"
        value={description}
        onChange={handleOnChangeDesc}
        placeholder="Opis punktu"
      ></textarea>
      <label className="add-marker-label"> Twoja ocena:</label>
      <select
        className="add-marker-select"
        value={rate}
        onChange={handleOnChangeRate}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <button className="add-marker-btn" type="submit">
        Dodaj miejsce
      </button>
    </form>
  );
};

export default observer(AddMarkerForm);
