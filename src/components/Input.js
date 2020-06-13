import React, { useState, useEffect } from "react";

import { handleEditTodo, handleNewTodo } from "../FirebaseTodos";

const Input = (props) => {
  const [newTodoInput, setNewTodoInput] = useState("");
  const [todoEditId, setTodoEditId] = useState("")



  useEffect(() => {
    if (props.todoToEdit && props.todoToEdit.id !== todoEditId) {
      setNewTodoInput(props.todoToEdit.content);
      setTodoEditId(props.todoToEdit.id)
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
      setTodoEditId("")
    }
  };

  const closeEdit = props.todoToEdit ? (
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

      <button className="btn" onClick={props.todoToEdit ? sendEdit : sendNewTodo}>
        {props.todoToEdit ? "Ändra" : "Skicka"}
      </button>
      {closeEdit}
    </div>
  );
};

export default Input;
