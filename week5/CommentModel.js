// Comment Model
let comments = [];

export default class CommentModel {
  constructor(name, content, type, date = new Date()) {
    this.name = name;
    this.content = content;
    this.date = date;
    this.type = type;
  }

  static getAllComments() {
    const savedComments = JSON.parse(localStorage.getItem("comments"));
    if (savedComments) {
      return savedComments;
    }
    return comments;
  }

  static getCommentsByName(name) {
    const savedComments = JSON.parse(localStorage.getItem("comments"));
    if (savedComments) {
      return savedComments.filter((comment) => comment.name === name);
    }
    return comments.filter((comment) => comment.name === name);
  }

  save() {
    const savedComments = JSON.parse(localStorage.getItem("comments"));
    if (savedComments) {
      comments = [...savedComments, this];
    }
    localStorage.setItem("comments", JSON.stringify(comments));
  }
}
