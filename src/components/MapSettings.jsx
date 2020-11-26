import React, { useState } from "react";
import "./style/MapSettings.css";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import { observer } from "mobx-react";
import { useMarkersStore } from "../store/hooks";
import { useUserStore } from "../store/hooks";
import AsidePanel from "./AsidePanel";
import MarkerInfoWrapp from "./MarkerInfoWrapp";

const MapSettings = () => {
  const { markers } = useMarkersStore();
  const { user } = useUserStore();
  const { isLogged } = user;
  const [activeMarkerId, setActiveMarkerId] = useState(null);
  const [asidePanel, setAsidePanel] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const handleMapClick = (event) => {
    if (isLogged) {
      setAsidePanel(true);
    }

    setLatitude(event.lngLat[1]);
    setLongitude(event.lngLat[0]);
  };
  const handleOnMarkerClick = (id) => {
    setActiveMarkerId(id);
  };
  const handleClickCloseAsidePanel = () => {
    setAsidePanel(false);
    setLatitude(0);
    setLongitude(0);
  };
  const showMarkers = markers.map((marker) => (
    <Marker
      key={marker._id}
      longitude={marker.longitude}
      latitude={marker.latitude}
    >
      <div onClick={() => handleOnMarkerClick(marker._id)}>
        <i className="fa fa-map-marker marker" aria-hidden="true"></i>
      </div>
    </Marker>
  ));

  //viewportSettings
  const [viewport, setViewport] = useState({
    latitude: 50.0619474,
    longitude: 19.9368564,
    width: "100vw",
    height: "95vh",
    zoom: 11,
    minZoom: 10,
  });
  const viewportSet = (viewport) => {
    const minLongitude = 19.659970559886762;
    const minLatitude = 49.94263135854484;
    const maxLongitude = 20.22832106155512;
    const maxLatitude = 50.19319323997475;
    if (viewport.longitude < minLongitude) {
      viewport.longitude = minLongitude;
    }
    if (viewport.longitude > maxLongitude) {
      viewport.longitude = maxLongitude;
    }
    if (viewport.latitude < minLatitude) {
      viewport.latitude = minLatitude;
    }
    if (viewport.latitude > maxLatitude) {
      viewport.latitude = maxLatitude;
    }
    setViewport(viewport);
  };

  return (
    <div className="map-container">
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/domblacha/ckh7q4j320xrl19o0uvb5bmom"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewport) => viewportSet(viewport)}
        onClick={handleMapClick}
      >
        <div style={{ position: "absolute", right: "2%", top: "2%" }}>
          <NavigationControl />
        </div>
        {showMarkers}
      </ReactMapGL>
      <AsidePanel
        aside={asidePanel}
        latitude={latitude}
        longitude={longitude}
        clickClose={handleClickCloseAsidePanel}
      />
      <MarkerInfoWrapp activeMarkerId={activeMarkerId} />
    </div>
  );
};

export default observer(MapSettings);
