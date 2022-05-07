import React, { useState, useEffect, createContext } from "react";
import TodoServices from "../services/TodoService";

const TodoContext = createContext();

function TodoProvider(props) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [lists, setLists] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    TodoServices.getAllLists()
      .then((response) => {
        setLists(response.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setError(e);
        console.log(e);
      });

    return () => {
      setRefresh(false);
    };
  }, [refresh]);

  const addNewList = (listName) => {
    let newList = { name: listName };
    TodoServices.createList(newList)
      .then((response) => {
        setRefresh(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteList = (id) => {
    TodoServices.deleteList(id)
      .then((response) => {
        setRefresh(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addTodoInList = (listId, tarea) => {
    let newTodo = { name: tarea, completed: false };
    TodoServices.createTodoInList(listId, newTodo)
      .then((response) => {
        setRefresh(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTodoInList = (listId, id) => {
    TodoServices.deleteTodoInList(listId, id)
      .then((response) => {
        setRefresh(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateTodoInList = (listId, todo) => {
    TodoServices.updateTodoInList(listId, todo)
      .then((response) => {
        setRefresh(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <TodoContext.Provider
      value={{
        lists,
        addNewList,
        deleteList,
        addTodoInList,
        deleteTodoInList,
        updateTodoInList,
        loading,
        error,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
