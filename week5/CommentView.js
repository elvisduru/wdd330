export default class CommentView {
  renderCommentView(commentList, listElement) {
    // loop through our list of comments building out the appropriate HTML for each and append it to the listElement
    listElement.innerHTML = "";
    commentList.forEach((comment) => {
      listElement.appendChild(this.renderOneComment(comment));
    });
  }
  renderOneComment(comment) {
    //
  }
}
