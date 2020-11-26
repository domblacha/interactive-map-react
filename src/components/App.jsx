import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { observer } from "mobx-react";
import {
  useUserStore,
  useMarkersStore,
  useCommentsStore,
} from "../store/hooks";
import "./style/App.css";
import MenuBar from "./MenuBar";
import UserDashboard from "./UserDashboard";
import RegisterLogic from "./RegisterLogic";
import MapSettings from "./MapSettings";

function App() {
  const { user } = useUserStore();
  const { setMarkers } = useMarkersStore();
  const { setComments } = useCommentsStore();
  useEffect(() => {
    axios
      .get("http://localhost:3001/markers")
      .then((res) => {
        setMarkers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:3001/comments")
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setComments, setMarkers]);
  return (
    <div className="container">
      <Router>
        <MenuBar
          items={[
            { content: "Mapa", to: "/" },
            { content: "Panel użytkownika", to: "/login" },
          ]}
        />
        <Switch>
          <Route exact path="/">
            <MapSettings />
          </Route>
          <Route path="/login">
            {user.isLogged ? <UserDashboard /> : <RegisterLogic />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default observer(App);
