import React, { useState, useEffect, useRef } from "react";

import { handleEditTodo, handleNewTodo } from "../FirebaseTodos";
import { UserContext } from "./App";

import '../styles/Input.css'

const Input = (props) => {
  const inputElement = useRef(null);
  const [newTodoInput, setNewTodoInput] = useState("");
  const user = React.useContext(UserContext);

  useEffect(() => {
    if (props.todoToEdit) {
      setNewTodoInput(props.todoToEdit.content);
      inputElement.current.focus();
    }
  }, [props.todoToEdit]);

  const sendNewTodo = async () => {
    if (newTodoInput === "") {
      alert("Tom todo tillåts ej");
      return;
    }
    const newTodo = { done: false, content: newTodoInput };
    const newTodoId = await handleNewTodo(user, newTodo);
    newTodo.id = newTodoId.name;
    props.buttonAction(newTodo);
    setNewTodoInput("");
  };

  const sendEdit = async () => {
    const editedTodo = { ...props.todoToEdit, content: newTodoInput };
    const edited = await handleEditTodo(user, editedTodo, true);
    if (edited) {
      props.buttonAction(editedTodo);
      setNewTodoInput("");
    }
  };

  const closeEdit = props.todoToEdit ? (
    <button
      className="btn"
      onClick={() => {
        setNewTodoInput("");
        props.disableEdit();
      }}
    >
      X
    </button>
  ) : null;

  return (
    <div className="Input">
      <input
        type="text"
        placeholder="Ny todo"
        value={newTodoInput}
        ref={inputElement}
        onChange={(e) => setNewTodoInput(e.target.value)}
      />

      <button
        className="btn"
        onClick={props.todoToEdit ? sendEdit : sendNewTodo}
      >
        {props.todoToEdit ? "Ändra" : "Skicka"}
      </button>
      {closeEdit}
    </div>
  );
};

export default Input;
