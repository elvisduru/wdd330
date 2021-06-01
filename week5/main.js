import HikesController from "./HikesController.js";
import CommentController from "./CommentController";
const controller = new HikesController("hikes");
window.addEventListener("load", function () {
  controller.showHikeList();
  controller.addHikeListener();
});
