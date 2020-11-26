import React from "react";
import "./style/MarkerInfoWrapp.css";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/hooks";
import { observer } from "mobx-react";
import MarkerInfo from "./MarkerInfo";
import CommentsInfo from "./CommentsInfo";
import CommentsForm from "./CommentsForm";

const MarkerInfoWrapp = ({ activeMarkerId }) => {
  const { user } = useUserStore();

  const { isLogged } = user;

  const title =
    !isLogged && !activeMarkerId ? (
      <p className="comment-info__title">
        Aby uzyskać informacje o miejcu, kliknij w znacznik. Aby móc komentować
        <Link to="/login"> zaloguj się!</Link>
      </p>
    ) : !activeMarkerId ? (
      <p className="comment-info__title">
        Kliknij w znacznik aby wyświetlić informacje
      </p>
    ) : null;
  return (
    <div className="comment-info">
      {title}
      <MarkerInfo activeMarkerId={activeMarkerId} />

      <div className="comments-container">
        <CommentsInfo activeMarkerId={activeMarkerId} />
      </div>

      {isLogged && activeMarkerId ? (
        <CommentsForm activeMarkerId={activeMarkerId} />
      ) : null}
    </div>
  );
};

export default observer(MarkerInfoWrapp);
