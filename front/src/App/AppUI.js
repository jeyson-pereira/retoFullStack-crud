import React, { useContext, Fragment } from "react";
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

  lists.sort((a, b) => a.id - b.id);
  return (
    <Fragment>
      <h1>TodoList App</h1>
      {loading && <p>Estamos cargando, no desesperes...</p>}
      {error && <p>Desespérate, hubo un error...</p>}
      {!loading && !error && !lists.length && <p>¡Crea tu primer Lista!</p>}

      <ListForm onAddList={addNewList} />

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
    </Fragment>
  );
}
