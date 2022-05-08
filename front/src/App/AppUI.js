import React, { useContext } from "react";
import ListForm from "../components/ListForm";
import TodoList from "../components/TodoList";
import { TodoContext } from "../context";

export default function AppUI() {
  const {
    lists,
    addNewList,
    deleteList,
    addTodoInList,
    deleteTodoInList,
    updateTodoInList,
    loading,
    error,
  } = useContext(TodoContext);

  /* Ordenar las listas por id. */
  lists.sort((a, b) => a.id - b.id);
  return (
    <div className="container">
      <h1>TodoList App</h1>
      {loading && <p className="fw-bold">Estamos cargando, no desesperes...</p>}
      {error && <p className="fw-bold">Desespérate, hubo un error...</p>}

      <ListForm onAddList={addNewList} />

      {!loading && !error && !lists.length && (
        <p className="mark fst-italic">¡Crea tu primer Lista!</p>
      )}

      {lists.map((list) => {
        return (
          <TodoList
            key={"list" + list.id}
            list={list}
            onDeleteList={() => deleteList(list.id)}
            onAddTodo={addTodoInList}
            onDeleteTodo={deleteTodoInList}
            onUpdateTodo={updateTodoInList}
          />
        );
      })}
    </div>
  );
}
