import React from 'react'
import "../styles/Todo.css"


export default function Todo(props) {
    return (
        <div className="Todo">
            {props.content}
        </div>
    )
}
