export default class CommentView {
  constructor(parentEl) {
    this.commentListEl = parentEl.nextElementSibling;
  }
  renderCommentView(commentList, hikeName) {
    // loop through our list of comments building out the appropriate HTML for each and append it to the listElement
    this.commentListEl.innerHTML = "<h2>Comments</h2>";
    commentList.forEach((comment) => {
      this.commentListEl.appendChild(this.renderOneComment(comment));
    });
    if (hikeName) {
      const commentForm = document.createElement("div");
      commentForm.innerHTML = `
        <textarea data-name="${hikeName}" id="commentField" rows="10"></textarea>
        <button id="commentBtn">Submit Comment</button>
        `;
      this.commentListEl.appendChild(commentForm);
    }
  }
  renderOneComment(comment) {
    const item = document.createElement("li");
    item.classList.add("comment");
    item.innerHTML = `
      <h4>${comment.name}</h4>
      <p>${comment.content}</p>
      <p>${new Date(comment.date).toLocaleDateString()}</p>
    `;
    return item;
  }
}
