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


  //Om username ändras så körs useEffect
  useEffect(() => {
    const fetchTodos = async () => {
      const todosArray = await getAllTodos(props.username);
      todosArray.sort((a, b) => a.done - b.done);
      setTodos(todosArray);
      setLoaded(true);
    };
    fetchTodos()
  }, [props.username]);

  
  const todosHelper = (todoToAdd) => {
    /*
    om todo är ny finns ej id så inget filtreras, 
    om todo är edited eller done ändras finns id och gamla tas bort
    */
    const todosWithoutOldTodo = todos.filter(
      (todo) => todo.id !== todoToAdd.id
    );
    //todos sorteras efter done så färdiga hamnar längst ner
    return [...todosWithoutOldTodo, todoToAdd].sort((a, b) => a.done - b.done);
  };

  const addOrEditTodo = (todoToAdd) => {
    setTodos(todosHelper(todoToAdd));
    if(todoToEdit) disableEdit()
  };

  const toggleTodoDone = async (id) => {
    const todoToToggle = todos.find((todo) => todo.id === id);
    const newTodo = { ...todoToToggle };
    const toggled = await handleEditTodo(props.username, newTodo);
    if (toggled) {
      setTodos(todosHelper({ ...newTodo, done: !newTodo.done }));
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

  //När todoToEdit inte är null är appen i edit mode
  const toggleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setTodoToEdit(todoToEdit);
  };

  const disableEdit = () => setTodoToEdit(null);

  /*
  Tar bort nyckeln user från sessionStorage
  använder react router för att pusha root routen så användaren hamnar på startsidan
  */
  const logout = () => {
    const confirmLogout = confirm("Är du säker du vill logga ut?");
    if (confirmLogout) {
      sessionStorage.removeItem("user");
      history.push("/");
      props.changeLogin();
    }
  };


  //Om todos finns så renderas de, annars visas LOADING
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
        todoToEdit={todoToEdit}
        disableEdit={disableEdit}></Input>

      {toShow}
      <button onClick={logout} className="btn logout">
        Logga ut
      </button>
    </div>
  );
};

export default TodoList;
