package co.com.sofka.crud.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TodoDTO {
    private Long id;

    @Size(min=3, max=150)
    @NotNull
    @Pattern(regexp = "[A-Za-zÀ-ÿ0-9@\\s]+", message = "No se permiten simbolos o caracteres especiales diferentes a letras con acento")
    private String name;

    @NotNull
    private boolean completed;

    @NotNull
    private Long listId;
}
