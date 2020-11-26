import { observable, action, makeObservable } from "mobx";

export default class CommentsStore {
  comments = [];
  constructor(comments) {
    makeObservable(this, {
      comments: observable,
      setComments: action,
    });
  }
  setComments = (comments) => (this.comments = comments);
}
