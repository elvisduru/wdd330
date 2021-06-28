export default class TodoModel {
  constructor(content, id = Date.now(), completed = false) {
    this.id = id;
    this.content = content;
    this.completed = completed;
  }
  static getTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    return todos;
  }

  static getTodo(id) {
    try {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      const todo = todos.find((t) => t.id === id);
      if (!todo) throw "No todo found";
      return todo;
    } catch (error) {
      console.log(error);
    }
  }

  static updateTodo(id, completed) {
    try {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      const foundTodo = todos.findIndex((t) => t.id == id);
      if (foundTodo === -1) throw "No todo found";
      todos[foundTodo].completed = completed;
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.log(error);
    }
  }

  static deleteTodo(id) {
    try {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      const foundTodo = todos.findIndex((t) => t.id == id);
      if (foundTodo === -1) throw "No todo found";
      todos.splice(foundTodo, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.log(error);
    }
  }

  save() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    localStorage.setItem("todos", JSON.stringify([...todos, this]));
  }
}
