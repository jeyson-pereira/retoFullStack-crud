import React, { useState, useEffect, createContext } from "react";
import TodoServices from "../services/TodoService";

const TodoContext = createContext();

function TodoProvider(props) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [lists, setLists] = useState([]);
  const [refresh, setRefresh] = useState(false);

  /* Un hook al que se llama cuando se monta el componente y cuando cambia el estado de
  actualización. */
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

  /**
   * AddNewList es una función que toma un listName como argumento y crea un nuevo objeto de lista con
   * la propiedad de nombre establecida en el argumento listName. Luego, llama a la función createList
   * desde el módulo TodoServices y pasa el objeto newList como argumento. Si la función createList
   * tiene éxito, establece el estado de actualización en verdadero. Si la función createList falla,
   * registra el error en la consola.
   * @param listName - el nombre de la lista que el usuario quiere crear
   */
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

  /**
   * Cuando se hace clic en el botón Eliminar, se llama a la función deleteList, que llama a la función
   * deleteList en el archivo TodoServices, que elimina la lista de la base de datos y luego establece
   * el estado de actualización en verdadero, lo que hace que la página se actualice, lo que hace que
   * la lista pueda desaparecer de la página.
   * @param id - el id de la lista a eliminar
   */
  const deleteList = (id) => {
    TodoServices.deleteList(id)
      .then((response) => {
        setRefresh(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /**
   * AddTodoInList es una función que toma un listId y una tarea, crea un nuevo objeto Todo y luego usa
   * la función TodoServices.createTodoInList para crear un nuevo todo en la lista con el listId dado.
   * @param listId - la identificación de la lista a la que se agregará el todo
   * @param tarea - es el texto que el usuario ha introducido en el campo de entrada
   */
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

  /**
   * Esta función elimina un elemento de tareas pendientes de una lista.
   * @param listId - el id de la lista a la que pertenece el todo
   * @param id - la identificación de la tarea
   */
  const deleteTodoInList = (listId, id) => {
    TodoServices.deleteTodoInList(listId, id)
      .then((response) => {
        setRefresh(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /**
   * Esta función actualiza una tarea pendiente en una lista llamando a la función updateTodoInList
   * desde el archivo TodoServices y luego establece el estado de actualización en verdadero.
   * @param listId - el id de la lista a la que pertenece el todo
   * @param todo - objeto que contiene los datos de la tarea actualizada
   */
  const updateTodoInList = (listId, todo) => {
    TodoServices.updateTodoInList(listId, todo)
      .then((response) => {
        setRefresh(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /* Devolviendo TodoContext.Provider con el valor de las listas, addNewList, deleteList,
  addTodoInList, deleteTodoInList, updateTodoInList, loading y error. */
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
