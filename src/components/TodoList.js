import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles/TodoList.css";

import Todo from "./Todo";
import Input from "./Input";
import {
  handleEditTodo,
  getAllTodos,
  handleDeleteTodo,
} from "../FirebaseTodos";

const TodoList = (props) => {
  const [todos, setTodos] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchTodos = async () => {
      const todosArray = await getAllTodos(props.username);
      todosArray.sort((a, b) => a.done - b.done);
      setTodos(todosArray);
      setLoaded(true);
    };
    if (todos.length === 0 && !loaded) fetchTodos();
  });

  /*
  Om todoToEdit är truthy så tar vi bort den ursprungliga innan nya läggs till
  */
  const addOrEditTodo = (todoToAdd) => {
    let newTodos = todos;
    if (todoToEdit) {
      newTodos = newTodos.filter((todo) => todo.id !== todoToAdd.id);
      setTodoToEdit(null);
    }
    newTodos = [...newTodos, todoToAdd].sort((a, b) => a.done - b.done);
    setTodos(newTodos);
  };

  const toggleTodoDone = async (id) => {
    const todoToToggle = todos.find((todo) => todo.id === id);
    const toggled = await handleEditTodo(props.username, todoToToggle);
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

  const toggleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setTodoToEdit(todoToEdit);
  };

  const disableEdit = () => setTodoToEdit(null);

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
          delete={deleteTodo}
          edit={toggleEdit}></Todo>
      ))}
    </React.Fragment>
  ) : (
    <p>LOADING</p>
  );

  return (
    <div className="TodoList">
      <h1>{props.username.toUpperCase()}S TODOS</h1>
      <Input
        buttonAction={addOrEditTodo}
        username={props.username}
        todoToEdit={todoToEdit}
        disableEdit={disableEdit}></Input>

      {toShow}
      <button onClick={logout} className="btn">
        Logga ut
      </button>
    </div>
  );
};

export default TodoList;
