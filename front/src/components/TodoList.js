import React, { useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

export default function TodoList(props) {
  props.list.items.sort((a, b) => a.id - b.id);

  const [selected, setSelected] = useState(null);

  return (
    <div>
      <div className="d-flex flex-row align-items-center">
        <h2 className="">{props.list.name}</h2>
        <div>
          <button
            onClick={props.onDeleteList}
            className="btn btn-danger btn-sm ms-2"
          >
            Eliminar
          </button>
        </div>
      </div>
      <TodoForm
        selected={selected}
        setSelected={setSelected}
        listId={props.list.id}
        onAdd={props.onAddTodo}
        onUpdate={props.onUpdateTodo}
      />
      {!props.list.items.length ? (
        <p className="mark fst-italic">¡Crea tu primer tarea!</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Tarea</th>
                <th className="text-center border">¿Completado?</th>
                <th className="text-center border">Acciones</th>
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
        </div>
      )}
    </div>
  );
}
