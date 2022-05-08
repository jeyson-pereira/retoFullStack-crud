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

  const taskCompletedStyle = "text-secondary text-decoration-line-through";

  return (
    <tr>
      <th scope="row">{props.todo.id}</th>
      <td className={props.todo.completed ? taskCompletedStyle : ""}>
        {props.todo.name}
      </td>
      <td className="text-center">
        <input
          type="checkbox"
          defaultChecked={props.todo.completed}
          onChange={(event) => updateCompleted(event)}
          style={{ width: 20, height: 20 }}
        />
      </td>
      <td className="d-flex justify-content-around">
        <button
          onClick={props.onEdit}
          className="btn btn-primary"
          disabled={props.todo.completed}
        >
          Editar
        </button>
        <button onClick={props.onDelete} className="btn btn-danger">
          Eliminar
        </button>
      </td>
    </tr>
  );
}
