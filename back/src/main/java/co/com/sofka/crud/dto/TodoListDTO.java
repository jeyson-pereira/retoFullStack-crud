package co.com.sofka.crud.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TodoListDTO {
    private Long id;
    private String name;
    private Set<TodoDTO> items = new HashSet<>();
}
