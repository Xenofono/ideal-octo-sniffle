import React, { useState, useEffect } from "react";

import { handleEditTodo, handleNewTodo } from "../FirebaseTodos";

const Input = (props) => {
  const [newTodoInput, setNewTodoInput] = useState("");

  useEffect(() => {
    if (props.todoToEdit && newTodoInput === "") {
      setNewTodoInput(props.todoToEdit.content);
    }
  });

  const sendNewTodo = async () => {
    if (newTodoInput === "") {
      alert("Tom todo tillåts ej");
      return;
    }
    const newTodo = {done: false, content:newTodoInput}
    const newTodoId = await handleNewTodo(props.username, newTodo);
    newTodo.id = newTodoId.name
    props.buttonAction(newTodo);
    setNewTodoInput("");
  };

  const sendEdit = async () => {
    const editedTodo = { ...props.todoToEdit, content: newTodoInput };
    const edited = await handleEditTodo(props.username, editedTodo, true);
    if (edited) {
      props.buttonAction(editedTodo);
      setNewTodoInput("");
    }
  };

  const closeEdit = props.edit ? (
    <button
      className="btn"
      onClick={() => {
        setNewTodoInput("");
        props.disableEdit();
      }}>
      X
    </button>
  ) : null;

  return (
    <div className="new-todo">
      <input
        type="text"
        placeholder="Ny todo"
        value={newTodoInput}
        onChange={(e) => setNewTodoInput(e.target.value)}
      />

      <button className="btn" onClick={props.edit ? sendEdit : sendNewTodo}>
        {props.edit ? "Ändra" : "Skicka"}
      </button>
      {closeEdit}
    </div>
  );
};

export default Input;
