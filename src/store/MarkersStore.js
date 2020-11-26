import { observable, action, makeObservable } from "mobx";

export default class MarkersStore {
  markers = [];

  constructor(markers) {
    makeObservable(this, {
      markers: observable,
      setMarkers: action,
    });
  }
  setMarkers = (markers) => {
    this.markers = markers;
  };
}
