import React from "react";
import axios from "axios";
import { observer } from "mobx-react";
import { useCommentsStore, useUserStore } from "../store/hooks";

const CommentsInfo = ({ activeMarkerId }) => {
  const { comments, setComments } = useCommentsStore();
  const { user } = useUserStore();
  const { id } = user;

  const hendleOnClickDeleteComm = (id) => {
    axios
      .post("http://localhost:3001/comments/deletecomm", {
        id,
      })
      .then(function (res) {
        if (res.statusText === "OK") {
          axios
            .get("http://localhost:3001/comments")
            .then((res) => {
              setComments(res.data);
              console.log(res.data);
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

  return comments.map((comm) => {
    if (comm.markerId === activeMarkerId) {
      return (
        <div className="comments" key={comm._id}>
          <p className="comments__author">
            Autor: {comm.authorName} {comm.authorSurname}
          </p>
          <p className="comments__rate">Ocena: {comm.commRate}</p>
          <p className="comments__label">Komentarz:</p>
          <p className="comments__desc">{comm.comment}</p>
          {comm.userId === id ? (
            <div>
              <button onClick={() => hendleOnClickDeleteComm(comm._id)}>
                Usuń
              </button>{" "}
            </div>
          ) : null}
        </div>
      );
    }
    return null;
  });
};

export default observer(CommentsInfo);
