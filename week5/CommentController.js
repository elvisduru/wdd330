import CommentModel from "./CommentModel.js";
import CommentView from "./CommentView.js";

export default class CommentController {
  constructor(parentId, type) {
    this.parentElement = document.getElementById(parentId);
    // this is how our controller will know about the model and view...we add them right into the class as members.
    this.commentView = new CommentView(parentId);
    this.type = type;
  }

  showCommentsList = (name = "") => {
    if (!name) {
      this.commentView.renderCommentView(CommentModel.getAllComments());
    } else {
      this.commentView.renderCommentView(
        CommentModel.getCommentsByName(name),
        name
      );
    }
  };

  addComment = () => {
    const commentField = document.querySelector("#commentField");
    // console.log(commentField.dataset.name);
    const hikeName = commentField.dataset.name;
    const newComment = new CommentModel(
      hikeName,
      commentField.value,
      this.type
    );
    newComment.save();
    this.commentView.renderCommentView(
      CommentModel.getCommentsByName(hikeName),
      hikeName
    );
    this.addCommentListener();
  };

  addCommentListener = () => {
    const commentBtn = document.querySelector("#commentBtn");
    commentBtn.addEventListener("click", (e) => {
      console.log("clicked button");
      this.addComment();
    });
    commentBtn.addEventListener("touchend", (e) => {
      this.addComment();
    });
  };
}
