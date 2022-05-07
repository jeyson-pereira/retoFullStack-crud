package co.com.sofka.crud.controller;

import co.com.sofka.crud.dto.TodoDTO;
import co.com.sofka.crud.dto.TodoListDTO;
import co.com.sofka.crud.services.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class TodoController {
    @Autowired
    private TodoService todoService;

    /**
     * Esta función devuelve una lista de todas las listas de tareas en la base de datos.
     *
     * @return Una lista de todas las listas de tareas
     */
    @GetMapping(value = "/lists")
    public Iterable<TodoListDTO> getAllListToDos(){
        return todoService.getAllListTodos();
    }

    /**
     * Esta función devuelve una lista de todos que están asociados con una lista con el id de listId
     *
     * @param listId La identificación de la lista para la que queremos obtener todos.
     * @return Una lista de TodoDTO
     */
    @GetMapping(value = "/list/{listId}/todos")
    public Iterable<TodoDTO> getToDosByListId(@PathVariable("listId") Long listId){
        return todoService.getTodosByListId(listId);
    }

    /**
     * Esta función es una solicitud POST que recibe un objeto TodoListDTO y devuelve un objeto TodoListDTO
     *
     * @param todo El objeto todo que se creará.
     * @return Una nueva lista de tareas pendientes.
     */
    @PostMapping(value = "/list")
    public TodoListDTO newListTodo(@RequestBody TodoListDTO todo){
        return todoService.newListTodo(todo);
    }

    /**
     * Esta función elimina una lista por id.
     *
     * @param id El id de la lista que se va a eliminar.
     */
    @DeleteMapping(value = "/list/{id}")
    public void deleteListById(@PathVariable("id") Long id){
        todoService.deleteListById(id);
    }

    /**
     * Actualiza una tarea por ID de lista.
     *
     * @param listId El id de la lista que contiene la tarea pendiente que desea actualizar.
     * @param todo El objeto que se actualizará.
     * @return Un objeto TodoDTO
     */
    @PutMapping(value = "/list/{listId}/todo")
    public TodoDTO updateAToDoByListId(@PathVariable("listId") Long listId, @RequestBody TodoDTO todo){
        if(todo.getId() != null){
            return todoService.updateATodoByListId(listId, todo);
        }
        throw new RuntimeException("No existe el id para actualizar");
    }

    /**
     * Toma un listId y un todoDTO como entrada y devuelve un todoDTO
     *
     * @param listId El id de la lista a la que se agregará la tarea.
     * @param todo El objeto todo que queremos agregar a la lista.
     * @return TodoDTO
     */
    @PostMapping(value = "/list/{listId}/todo")
    public TodoDTO addNewTodoByListId(@PathVariable("listId") Long listId, @RequestBody TodoDTO todo){
        return todoService.addNewTodoByListId(listId, todo);
    }

    /**
     * Elimina una tarea por ID de lista y ID de tarea.
     *
     * @param listId El id de la lista a la que pertenece la tarea
     * @param id La identificación de la tarea que desea eliminar.
     */
    @DeleteMapping(value = "/list/{listId}/todo/{id}")
    public void deleteATodoByListId(@PathVariable("listId")Long listId, @PathVariable("id")Long id){
        todoService.deleteATodoByListId(listId ,id);
    }
}
