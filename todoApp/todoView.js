export default class TodoView {
  constructor(parentEl) {
    this.parentEl = document.getElementById(parentEl);
  }

  renderTodoList(todos, filter) {
    this.parentEl.innerHTML = "";
    if (filter === "completed") {
      todos
        .reverse()
        .filter((t) => t.completed === true)
        .forEach((todo) => {
          this.addTodo(todo);
        });
    } else if (filter === "incomplete") {
      todos
        .reverse()
        .filter((t) => t.completed === false)
        .forEach((todo) => {
          this.addTodo(todo);
        });
    } else {
      todos.reverse().forEach((todo) => {
        this.addTodo(todo);
      });
    }
  }

  addTodo({ id, content, completed }) {
    const li = document.createElement("li");
    li.classList.add("task");
    li.setAttribute("data-id", id);
    li.setAttribute("data-completed", completed);
    if (completed) {
      li.classList.add("done");
    }
    li.innerHTML = `${content} <span>X</span>`;
    this.parentEl.appendChild(li);
  }
}
