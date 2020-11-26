import { observable, action, makeObservable } from "mobx";

export default class UserStore {
  user = {
    isLogged: false,
    id: null,
    name: "",
    surname: "",
  };
  constructor(user) {
    makeObservable(this, {
      user: observable,
      userIsLoged: action,
      userLogout: action,
    });
  }
  userIsLoged = (loggedUser) => {
    const { id, name, surname } = loggedUser;
    this.user = {
      isLogged: true,
      id,
      name,
      surname,
    };
  };
  userLogout = () => {
    this.user = {
      isLogged: false,
      id: null,
      name: "",
      surname: "",
    };
  };
}
