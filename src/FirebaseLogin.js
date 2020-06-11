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


//använder PUT istället för POST för annars genererar firebase ett id för lösenordet
export const newAccount = async (newUser = { username: "sno", password:"test" }) => {
  const requestObject = {
    password: newUser.password
  }
  const userAlreadyExistsResponse = await fetch(DB_URL + `/${newUser.username}.json`);
  const userAlreadyExistsData = await userAlreadyExistsResponse.json();
  if (userAlreadyExistsData) {
    alert(`Användarnamnet ${newUser.username} är upptaget`);
    return;
  }
  const newAccountResponse = await fetch(DB_URL + `/${newUser.username}.json`, {
    method: 'PUT',
    body: JSON.stringify(requestObject)
  })
  const newAccountData = await newAccountResponse.json()
  console.log(newAccountData)
};
