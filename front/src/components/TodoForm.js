import React, { useState, useEffect } from "react";

export default function TodoForm(props) {
  const [todoName, setTodoName] = useState("");

  useEffect(() => {
    if (props.selected) {
      setTodoName(props.selected.name);
    }
  }, [props.selected]);

  const updateTodo = () => {
    let todo = {
      id: props.selected.id,
      name: todoName,
      completed: props.selected.completed,
      listId: props.selected.listId,
    };
    props.onUpdate(todo.listId, todo);
    props.setSelected(null);
  };

  const createTodo = () => {
    props.onAdd(props.listId, todoName);
  };

  return (
    <form onSubmit={props.selected ? () => updateTodo() : () => createTodo()}>
      <input
        type="text"
        placeholder="¿Que tienes pendiente?"
        required
        defaultValue={todoName}
        onChange={(event) => setTodoName(event.target.value)}
      />
      <input type="submit" value={props.selected ? "Actualizar" : "Crear"} />
    </form>
  );
}
