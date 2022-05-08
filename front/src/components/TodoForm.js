import React, { useState, useEffect } from "react";

export default function TodoForm(props) {
  const [todoName, setTodoName] = useState("");

  /* Un hook que se llama cuando se monta el componente y cuando cambia props.selected. */
  useEffect(() => {
    if (props.selected) {
      setTodoName(props.selected.name);
    }
  }, [props.selected]);

  /**
   * Cuando el usuario hace clic en el botón de actualización, el objeto de tareas pendientes se
   * actualiza con el nuevo nombre y se llama a la función onUpdate con el listId y el objeto de tareas
   * pendientes actualizado.
   */
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

  /**
   * Cuando el usuario hace clic en el botón, se crea un nuevo todo mediante la funcion
   * onAdd pasada con listId y el nombre del todo
   */
  const createTodo = () => {
    props.onAdd(props.listId, todoName);
  };

  return (
    <div class="col col-md-5 my-2">
      <form onSubmit={props.selected ? () => updateTodo() : () => createTodo()}>
        <div className="input-group">
          <input
            type="text"
            placeholder="¿Que tienes pendiente?"
            required
            pattern="[A-Za-zÀ-ÿ0-9@ ]+"
            title="No se permiten simbolos o caracteres especiales diferentes a letras con acento"
            minLength={3}
            maxLength={150}
            defaultValue={todoName}
            onChange={(event) => setTodoName(event.target.value)}
            className="form-control prepend"
          />
          <input
            type="submit"
            value={props.selected ? "Actualizar" : "Crear"}
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
