import CommentModel from "./CommentModel";
import CommentView from "./CommentView";

export default class CommentController {
  constructor(parentId) {
    this.parentElement = document.getElementById(parentId);
    // this is how our controller will know about the model and view...we add them right into the class as members.
    this.commentView = new CommentView(parentId);
  }

  showCommentsList = () => {
    console.log(CommentModel.getAllComments());
    // this.commentView.renderCommentList(
    //   CommentModel.getAllComments(),
    //   this.parentElement
    // );
  };
}
