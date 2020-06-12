import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import "../styles/TodoList.css";

import Todo from "./Todo";
import {
  handleToggleTodoDone,
  getAllTodos,
  handleDeleteTodo,
  handleNewTodo
} from "../FirebaseTodos";

const TodoList = (props) => {
  const [todos, setTodos] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [newTodoInput, setNewTodoInput] = useState("");
  const history = useHistory();

  useEffect(() => {
    const fetchTodos = async () => {
      const todosArray = await getAllTodos(props.username);
      await setTodos(todosArray);
      await setLoaded(true);
    };
    if (todos.length === 0 && !loaded) fetchTodos();
  });

  const toggleTodoDone = async (id) => {
    const todoToToggle = todos.find((todo) => todo.id === id);
    const toggled = await handleToggleTodoDone(props.username, todoToToggle);
    if (toggled) {
      const newTodos = todos
        .map((todo) => {
          if (todo.id === id) {
            todo.done = !todo.done;
            return todo;
          }
          return todo;
        })
        .sort((a, b) => a.done - b.done);
      setTodos(newTodos);
    }
  };

  const deleteTodo = async (id) => {
    const todoToDelete = todos.find((todo) => todo.id === id);
    const deleted = await handleDeleteTodo(props.username, todoToDelete);
    if (deleted) {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    }
  };

  const sendNewTodo = async() => {
    if(newTodoInput === ""){
      alert("Tom todo tillåts ej");
      return;
    }
    const newTodoId = await handleNewTodo(props.username,newTodoInput)
    const newTodos = [...todos, {content:newTodoInput, done:false, id:newTodoId.name}].sort((a, b) => a.done - b.done);
    setTodos(newTodos)
    setNewTodoInput("")
  }



  const logout = () => {
    const confirmLogout = confirm("Är du säker du vill logga ut?");
    if (confirmLogout) {
      sessionStorage.removeItem("login");
      sessionStorage.removeItem("user");
      history.push("/");
      props.changeLogin();
    }
  };

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
      <h1>{props.username.toUpperCase()}S TODOS</h1>
      <div className="new-todo">
        <input
          type="text"
          placeholder="Ny todo"
          value={newTodoInput}
          onChange={(e) => setNewTodoInput(e.target.value)}
        />
        <button className="btn" onClick={sendNewTodo}>Skicka</button>
      </div>

      {toShow}
      <button onClick={logout} className="btn">
        Logga ut
      </button>
    </div>
  );
};

export default TodoList;
