import HikesController from "./HikesController.js";
const hikesController = new HikesController("hikes");

window.addEventListener("load", function () {
  hikesController.showHikeList();
  hikesController.addHikeListener();
});
