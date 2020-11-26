import CommentsStore from "./CommentsStore";
import MarkersStore from "./MarkersStore";
import UserStore from "./UserStore";

export default class RootStore {
  constructor() {
    this.userStore = new UserStore();
    this.markersStore = new MarkersStore();
    this.commentsStore = new CommentsStore();
  }
}
