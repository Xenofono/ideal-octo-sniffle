import React, { useState } from "react";
import "../styles/TodoList.css"

import Todo from './Todo'

const TodoList = (props) => {
  const [todos, setTodos] = useState([
    "Besikta bilen",
    "Handla mat",
    "Göra todoapp",
  ]);

  return (
    <div className="TodoList">
      {todos.map((todo) => (
        <Todo content={todo}></Todo>
      ))}
    </div>
  );
};

export default TodoList;
