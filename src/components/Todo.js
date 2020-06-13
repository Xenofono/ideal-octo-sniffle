import React from "react";
import "../styles/Todo.css";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Todo(props) {
  let cssClass = "Default";

  cssClass += props.done ? " Done" : " Todo";

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    props.delete(props.id);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    props.edit(props.id)
  }

  return (
    <div className={cssClass} onClick={() => props.toggleDone(props.id)}>
      {props.content}
      <FontAwesomeIcon
        icon={faTrash}
        className={["remove", "icon"].join(" ")}
        onClick={handleDeleteClick}></FontAwesomeIcon>
      <FontAwesomeIcon
        icon={faPen}
        className={["edit", "icon"].join(" ")}
        onClick={handleEditClick}></FontAwesomeIcon>
    </div>
  );
}
