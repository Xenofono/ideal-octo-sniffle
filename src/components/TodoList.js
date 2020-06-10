import React, { useState, useEffect } from "react";
import "../styles/TodoList.css";

import Todo from "./Todo";
import { handleToggleTodoDone, getAllTodos, handleDeleteTodo } from "../FirebaseTodos";

const TodoList = (props) => {
  const [todos, setTodos] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      const todosArray = await getAllTodos();
      await setTodos(todosArray);
      await setLoaded(true);
    };
    if (todos.length === 0) fetchTodos();
  });

  const toggleTodoDone = async (id) => {
    const todoToToggle = todos.find((todo) => todo.id === id);
    const toggled = await handleToggleTodoDone(todoToToggle);
    if (toggled) {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.done = !todo.done;
          return todo;
        }
        return todo;
      });
      setTodos(newTodos);
    }
  };

  const deleteTodo = async (id) => {
    const todoToDelete = todos.find(todo => todo.id === id)
    const deleted = await handleDeleteTodo(todoToDelete)
    if(deleted){
      const newTodos = todos.filter(todo => todo.id !== id)
      setTodos(newTodos)
    }
  }

  const toShow = loaded ? (
    <React.Fragment>
      {todos.map((todo) => (
        <Todo
          content={todo.content}
          key={todo.id}
          id={todo.id}
          done={todo.done}
          toggleDone={toggleTodoDone}
          delete={deleteTodo}></Todo>
      ))}
    </React.Fragment>
  ) : (
    <p>LOADING</p>
  );

  return (
    <div className="TodoList">
      {toShow}
      <button onClick={() => props.changeLogin()}>Logga ut</button>
    </div>
  );
};

export default TodoList;
