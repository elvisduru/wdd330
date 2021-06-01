// Comment Model
const comments = [
  {
    name: "Bechler Falls",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi, atque!",
    date: "2021-06-01T23:47:06.749Z",
  },
  {
    name: "Teton Canyon",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi, atque!",
    date: "2021-05-01T23:47:06.749Z",
  },
];

export default class CommentModel {
  constructor(name, content, date = new Date()) {
    this.name = name;
    this.content = content;
    this.date = date;
  }

  static getAllComments() {}

  static getCommentByName(name) {}

  static addComment() {
    comments.push(this);
  }
}
