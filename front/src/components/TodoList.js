import React, { useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

export default function TodoList(props) {
  props.list.items.sort((a, b) => a.id - b.id);

  const [selected, setSelected] = useState(null);

  return (
    <div style={{ margin: 10 }}>
      <div>
        <h2>{props.list.name}</h2>
        <button onClick={props.onDeleteList}>Eliminar</button>
      </div>
      <TodoForm
        selected={selected}
        setSelected={setSelected}
        listId={props.list.id}
        onAdd={props.onAddTodo}
        onUpdate={props.onUpdateTodo}
      />
      {!props.list.items.length ? (
        <p>¡Crea tu primer tarea!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Tarea</td>
              <td>¿Completado?</td>
            </tr>
          </thead>
          <tbody>
            {props.list.items.map((todo) => {
              return (
                <Todo
                  key={"todo" + todo.id}
                  todo={todo}
                  onDelete={() => props.onDeleteTodo(todo.listId, todo.id)}
                  onEdit={() => setSelected(todo)}
                  onCompleted={props.onUpdateTodo}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
