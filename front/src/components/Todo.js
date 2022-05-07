import React from "react";

export default function Todo(props) {
  const updateCompleted = (event) => {
    props.onCompleted(props.todo.listId, {
      id: props.todo.id,
      name: props.todo.name,
      completed: event.target.checked,
      listId: props.todo.listId,
    });
  };

  return (
    <tr>
      <td>{props.todo.id}</td>
      <td>{props.todo.name}</td>
      <td>
        <input
          type="checkbox"
          defaultChecked={props.todo.completed}
          onChange={(event) => updateCompleted(event)}
        />
      </td>
      <td>
        <button onClick={props.onDelete}>Eliminar</button>
      </td>
      <td>
        <button onClick={props.onEdit}>Editar</button>
      </td>
    </tr>
  );
}
