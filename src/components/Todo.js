import React from "react";
import "../styles/Todo.css";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Todo = (props) => {
  let cssClass = "Default";
  if(props.done) cssClass += " Done"

  const handleClick = (e, cb) => {
    e.stopPropagation();
    cb(props.id)
  }

  return (
    <div className={cssClass} onClick={() => props.toggleDone(props.id)}>
      <p>{props.content}</p>
      <FontAwesomeIcon
        icon={faTrash}
        className={["remove", "icon"].join(" ")}
        onClick={(e) => handleClick(e, props.delete)}></FontAwesomeIcon>
      <FontAwesomeIcon
        icon={faPen}
        className={["edit", "icon"].join(" ")}
        onClick={(e) => handleClick(e, props.edit)}></FontAwesomeIcon>
    </div>
  );
}

export default React.memo(Todo)
