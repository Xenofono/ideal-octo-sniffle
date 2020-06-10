const DB_URL = "https://sti-todo-app.firebaseio.com/users";

export const login = ({ username, password }) => {
  return fetch(DB_URL + `/${username}.json`)
    .then((response) => response.json())
    .then((data) => {
      return data.password === password;
    })
    .catch((e) => {
      console.log(e);
      return false;
    });
};
