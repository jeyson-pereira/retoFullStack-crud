import React, { useState } from "react";

export default function ListForm(props) {
  const [listName, setListName] = useState("");
  /* Devolver un formulario con una entrada de texto y un botón de envío. */
  return (
    <div class="col col-md-3 my-4">
      <form onSubmit={() => props.onAddList(listName)}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Lista de TO-DO"
            required
            pattern="[A-Za-zÀ-ÿ0-9@ ]+"
            title="No se permiten simbolos o caracteres especiales diferentes a letras con acento"
            minLength={3}
            maxLength={50}
            onChange={(event) => setListName(event.target.value)}
            className="form-control prepend"
          />
          <input
            type="submit"
            value="Nueva lista"
            className="btn btn-success"
          />
        </div>
      </form>
    </div>
  );
}
