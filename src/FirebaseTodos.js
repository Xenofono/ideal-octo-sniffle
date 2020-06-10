const DB_URL = "https://sti-todo-app.firebaseio.com/todos";

export const getAllTodos = async () => {
  const response = await fetch(DB_URL + ".json");
  const data = await response.json();
  const todoArray = [];
  Object.entries(data).forEach((todo) => {
    const [id, value] = todo;
    const todoObj = {
      id: todo[0],
      content: todo[1].content,
      done: todo[1].done,
    };
    todoArray.push(todoObj);
  });
  return Promise.resolve(todoArray);
};

export const handleToggleTodoDone = async (todo) => {
  const todoCopy = { ...todo };
  todoCopy.done = !todoCopy.done;
  const response = await fetch(`${DB_URL}/${todoCopy.id}.json`, {
    method: "PATCH",
    body: JSON.stringify(todoCopy),
  });
  console.log(response.status)
  if (response.status === 200) {
    const data = await response.json();
    console.log(data)
    return true;
  } else {
    return false;
  }
};

export const handleDeleteTodo = async (todo) => {
    const response = await fetch(`${DB_URL}/${todo.id}.json`, {
      method: "DELETE"
    });
    console.log(response.status)
    if (response.status === 200) {
      const data = await response.json();
      console.log(data)
      return true;
    } else {
      return false;
    }
  };

// const todo = {
//     content: "Lära sig react",
//     done: false,
// }

// fetch("https://sti-todo-app.firebaseio.com/todos"+".json", {
//     method: "POST",
//     body: JSON.stringify(todo)
// })
