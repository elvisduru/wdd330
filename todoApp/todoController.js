import TodoModel from "./todoModel.js";
import TodoView from "./todoView.js";

export default class TodoController {
  constructor() {
    this.todoView = new TodoView("list");
    this.todoInput = document.getElementById("todoInput");
    this.controlEl = document.getElementById("controls");
    this.filter = "all";
  }

  showTodos() {
    this.todoView.renderTodoList(TodoModel.getTodos(), this.filter);
  }

  updateTodo(todoEl) {
    const isDone =
      todoEl.getAttribute("data-completed") === "false" ? false : true;
    TodoModel.updateTodo(todoEl.getAttribute("data-id"), !isDone);
    todoEl.setAttribute("data-completed", isDone);
    todoEl.classList.toggle("done");
    this.showTodos();
  }

  removeTodo(todoEl) {
    TodoModel.deleteTodo(todoEl.getAttribute("data-id"));
    todoEl.remove();
  }

  createTodo() {
    const content = this.todoInput.value;
    if (content) {
      const newTodo = new TodoModel(content);
      newTodo.save();
      this.showTodos();
    }
  }

  addAllEventListeners() {
    this.todoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && e.target.value) {
        this.createTodo();
        e.target.value = "";
      }
    });

    this.todoView.parentEl.addEventListener("click", (e) => {
      // Update todo item
      if (e.target.matches("li")) {
        this.updateTodo(e.target);
      }

      // Remove todo item
      if (e.target.matches("span")) {
        this.removeTodo(e.target.parentElement);
      }
    });

    this.controlEl.addEventListener("click", (e) => {
      this.controlEl.querySelectorAll("button").forEach((el) => {
        el.classList.remove("selected");
      });
      if (e.target.matches("#all")) {
        e.target.classList.toggle("selected");
        this.filter = "all";
      }

      if (e.target.matches("#completed")) {
        e.target.classList.toggle("selected");
        this.filter = "completed";
      }

      if (e.target.matches("#incomplete")) {
        e.target.classList.toggle("selected");
        this.filter = "incomplete";
      }
      this.showTodos();
    });
  }
}
