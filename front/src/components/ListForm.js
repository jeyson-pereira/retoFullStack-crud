import React, { useState } from "react";

export default function ListForm(props) {
  const [listName, setListName] = useState("");
  return (
    <form onSubmit={() => props.onAddList(listName)}>
      <input
        type="text"
        placeholder="Lista de TO-DO"
        required
        pattern="[A-Za-zÀ-ÿ0-9@ ]+"
        title="No se permiten simbolos o caracteres especiales diferentes a letras con acento"
        minLength={3}
        maxLength={50}
        onChange={(event) => setListName(event.target.value)}
      />
      <input type="submit" value="Nueva Lista" />
    </form>
  );
}
