const DB_URL = "https://sti-todo-app.firebaseio.com/users";

export const getAllTodos = async (username) => {
  const response = await fetch(`${DB_URL}/${username}/todos.json`);
  const data = await response.json();
  const todoArray = [];
  if (!data) return Promise.resolve(todoArray);
  Object.entries(data).forEach((todo) => {
    const todoObj = {
      id: todo[0],
      content: todo[1].content,
      done: todo[1].done,
    };
    todoArray.push(todoObj);
  });
  return Promise.resolve(todoArray);
};

//används för både ändra status done och innehåll, bestäms av boolean edit
export const handleEditTodo = async (username, todo, edit = false) => {
  const todoCopy = edit ? { content: todo.content } : { done: !todo.done };
  const response = await fetch(`${DB_URL}/${username}/todos/${todo.id}.json`, {
    method: "PATCH",
    body: JSON.stringify(todoCopy),
  });
  console.log(response.status);
  if (response.status === 200) {
    const data = await response.json();
    console.log(data);
    return true;
  } else {
    return false;
  }
};

export const handleDeleteTodo = async (username, todo) => {
  const response = await fetch(`${DB_URL}/${username}/todos/${todo.id}.json`, {
    method: "DELETE",
  });
  console.log(response.status);
  if (response.status === 200) {
    const data = await response.json();
    console.log(data);
    return true;
  } else {
    return false;
  }
};

export const handleNewTodo = async (username, todo) => {
  const response = await fetch(`${DB_URL}/${username}/todos.json`, {
    method: "POST",
    body: JSON.stringify(todo),
  });
  const data = await response.json();
  return data;
};

// const todo = {
//     content: "react",
//     done: false,
// }

// fetch("https://sti-todo-app.firebaseio.com/users/kristoffer/todos"+".json", {
//     method: "POST",
//     body: JSON.stringify(todo)
// })
