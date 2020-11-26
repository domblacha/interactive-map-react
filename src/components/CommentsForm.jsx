import React, { useState } from "react";
import axios from "axios";
import { observer } from "mobx-react";
import { useUserStore, useCommentsStore } from "../store/hooks";
const CommentsForm = ({ activeMarkerId }) => {
  const { user } = useUserStore();
  const { setComments } = useCommentsStore();
  const { name, surname, id } = user;
  const [comm, setComm] = useState("");
  const [rate, setRate] = useState("5");

  const handleOnChangeComm = (e) => setComm(e.target.value);
  const handleOnChangeRate = (e) => setRate(e.target.value);

  const handleOnSubmitComm = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/comments/add", {
        activeMarkerId,
        id,
        name,
        surname,
        comm,
        rate,
      })
      .then((res) => {
        if (res.statusText === "OK") {
          axios
            .get("http://localhost:3001/comments")
            .then((res) => {
              setComments(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setComm("");
    setRate("5");
  };

  return (
    <form className="comments-form" onSubmit={handleOnSubmitComm}>
      <input defaultValue={name} type="text" placeholder="Imię" readOnly />
      <input
        defaultValue={surname}
        type="text"
        placeholder="Nazwisko"
        readOnly
      />
      <textarea
        className="comments-form__textarea"
        value={comm}
        onChange={handleOnChangeComm}
        placeholder="Komentarz"
      ></textarea>
      <label>
        {" "}
        Twoja ocena
        <select value={rate} onChange={handleOnChangeRate}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <button type="submit">Dodaj komentarz</button>
    </form>
  );
};

export default observer(CommentsForm);
