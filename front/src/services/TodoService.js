import http from "../http-common";

class TodoService {
  getAllLists() {
    return http.get("/lists");
  }

  createList(data) {
    return http.post("/list", data);
  }

  deleteList(id) {
    return http.delete(`/list/${id}`);
  }

  createTodoInList(listId, data) {
    return http.post(`/list/${listId}/todo`, data);
  }

  deleteTodoInList(listId, id) {
    return http.delete(`/list/${listId}/todo/${id}`);
  }

  updateTodoInList(listId, data) {
    return http.put(`/list/${listId}/todo`, data);
  }
}

export default new TodoService();
