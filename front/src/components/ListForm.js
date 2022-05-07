import React, { useState } from "react";

export default function ListForm(props) {
  const [listName, setListName] = useState("");
  return (
    <form onSubmit={() => props.onAddList(listName)}>
      <input
        type="text"
        placeholder="Lista de TO-DO"
        required
        onChange={(event) => setListName(event.target.value)}
      />
      <input type="submit" value="Nueva Lista" />
    </form>
  );
}
