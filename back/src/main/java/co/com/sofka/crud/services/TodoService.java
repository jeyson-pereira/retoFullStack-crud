package co.com.sofka.crud.services;

import co.com.sofka.crud.dto.TodoDTO;
import co.com.sofka.crud.dto.TodoListDTO;
import co.com.sofka.crud.models.Todo;
import co.com.sofka.crud.models.TodoList;
import co.com.sofka.crud.repositories.TodoListRepository;
import co.com.sofka.crud.repositories.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class TodoService {
    public static final String NOT_FOUND_ID = "No existe el id buscado";
    private TodoListRepository listRepository;
    private TodoRepository todoRepository;

    @Autowired
    public TodoService(TodoListRepository listRepository, TodoRepository todoRepository) {
        this.listRepository = listRepository;
        this.todoRepository = todoRepository;
    }

    //------------------------------LISTAS------------------------------//

    /**
     * Estamos usando la clase `StreamSupport` para crear un flujo a partir del `Iterable` devuelto por el método
     * `findAll()` del objeto `listRepository`. Luego mapeamos cada objeto `TodoList` a un objeto `TodoListDTO`
     *
     * @return Un conjunto de objetos TodoListDTO.
     */
    public Set<TodoListDTO> getAllListTodos() {
        return StreamSupport
                .stream(listRepository.findAll().spliterator(), false)
                .map(todoList -> {
                    Set<TodoDTO> listDTO = todoList.getTodos()
                            .stream()
                            .map(item -> new TodoDTO(item.getId(), item.getName(), item.isCompleted(), todoList.getId()))
                            .collect(Collectors.toSet());
                    return new TodoListDTO(todoList.getId(), todoList.getName(), listDTO);
                })
                .collect(Collectors.toSet());
    }

    /**
     * Estamos obteniendo una lista por su ID, si existe, estamos obteniendo todos los to-do en esa lista, asignándolos a
     * TodoDTO y devolviéndolos como un conjunto
     *
     * @param id El id de la lista de la que queremos obtener todos.
     * @return Un conjunto de TodoDTO
     */
    public Set<TodoDTO> getTodosByListId(Long id){
        return listRepository.findById(id)
                .orElseThrow(() -> {
                    throw new RuntimeException(NOT_FOUND_ID);
                })
                .getTodos().stream()
                .map(todo -> new TodoDTO(todo.getId(), todo.getName(), todo.isCompleted(), id))
                .collect(Collectors.toSet());
    }

    /**
     * > Esta función crea un nuevo objeto TodoList, establece su nombre con el nombre pasado en TodoListDTO, lo guarda en
     * la base de datos y devuelve TodoListDTO con el id de TodoList recién creada
     *
     * @param todoListDTO El objeto que se creará.
     * @return Un nuevo objeto TodoListDTO con la identificación del objeto TodoList recién creado.
     */
    public TodoListDTO newListTodo(TodoListDTO todoListDTO) {
        TodoList listTodo = new TodoList();
        listTodo.setName(Objects.requireNonNull(todoListDTO.getName()));
        Long id = listRepository.save(listTodo).getId();
        todoListDTO.setId(id);
        return todoListDTO;
    }

    /**
     * > Esta función elimina una lista por su id
     *
     * @param listId El id de la lista que se va a eliminar.
     */
    public void deleteListById(Long listId){
        TodoList listTodo = listRepository.findById(listId)
                .orElseThrow(() -> {
                    throw new RuntimeException(NOT_FOUND_ID);
                });
        listRepository.delete(listTodo);
    }


    //------------------------------TODOS------------------------------//

    /**
     * > Esta función agrega un nuevo to-do a una lista
     *
     * @param listId El id de la lista a la que se agregará el to-do.
     * @param todoDTO El objeto que contiene los datos que se utilizarán para crear un nuevo to-do.
     * @return TodoDTO
     */
    public TodoDTO addNewTodoByListId(Long listId, TodoDTO todoDTO){
        TodoList listTodo = listRepository.findById(listId)
                .orElseThrow(() -> {
                    throw new RuntimeException(NOT_FOUND_ID);
                });

        Todo todo = new Todo();
        todo.setCompleted(todoDTO.isCompleted());
        todo.setName(Objects.requireNonNull(todoDTO.getName()));
        todo.setId(todoDTO.getId());


        listTodo.getTodos().add(todo);

        TodoList listUpdated = listRepository.save(listTodo);

        Todo lastToDo = listUpdated.getTodos()
                .stream()
                .max(Comparator.comparingInt(item -> item.getId().intValue()))
                .orElseThrow();
        todoDTO.setId(lastToDo.getId());
        todoDTO.setListId(listId);
        return todoDTO;
    }


    /**
     * > Actualizar una tarea pendiente por ID de lista
     *
     * @param listId El id de la lista a la que pertenece la tarea.
     * @param todoDTO El objeto todoDTO que contiene la información actualizada de todo.
     * @return Un objeto TodoDTO
     */
    public TodoDTO updateATodoByListId(Long listId, TodoDTO todoDTO) {
        TodoList listTodo = listRepository.findById(listId)
                .orElseThrow(() -> {
                    throw new RuntimeException(NOT_FOUND_ID);
                });

        for(Todo todo : listTodo.getTodos()){
            if(todo.getId().equals(todoDTO.getId())){
                todo.setCompleted(todoDTO.isCompleted());
                todo.setName(Objects.requireNonNull(todoDTO.getName()));
                todo.setId(Objects.requireNonNull(todoDTO.getId()));
            }
        }

        listRepository.save(listTodo);

        return todoDTO;
    }

    /**
     * > Si la lista contiene el to-do, elimine el to-do de la lista y guarde la lista
     *
     * @param listId El id de la lista a la que pertenece el to-do.
     * @param id La identificación del to-do que desea eliminar.
     */
    public void deleteATodoByListId(Long listId, Long id){
        Todo todo = todoRepository.findById(id).orElseThrow();
        TodoList list = listRepository.findById(listId).orElseThrow();
        if (list.getTodos().contains(todo)) {
            list.removeTodo(todo);
            listRepository.save(list);
        }else {
            throw new RuntimeException(NOT_FOUND_ID);
        }
    }

}
