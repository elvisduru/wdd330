
import HikeModel from './HikeModel.js';
import HikesView from './HikesView.js';

// Hike controller
export default class HikesController {
  constructor(parentId) {
    this.parentElement = document.getElementById(parentId); 
    // this is how our controller will know about the model and view...we add them right into the class as members.
    this.hikeModel = new HikeModel();
    this.hikesView = new HikesView(parentId);
  }
  
  showHikeList = () => {
    //  this will get called each time we need to display our full hike list. It should grab the list of hikes from the Model, and then send them to the view.
    this.hikesView.renderHikeList(this.hikeModel.getAllHikes(), this.parentElement);
    this.addHikeListener();
  }

  showOneHike = (hikeName) => {
    // use this when you need to show just one hike...with full details
    
    this.hikesView.renderOneHikeFull(this.hikeModel.getHikeByName(hikeName), this.parentElement).onclick = () => {
      this.showHikeList();
    };
  }

  addHikeListener = () => {
    // for the stretch you will need to attach a listener to each of the listed hikes to watch for a touchend. 
    const hikeElements = document.querySelectorAll("ul>li");
    const backButton = document.querySelector('button');
    hikeElements.forEach(el => {
      
      el.addEventListener("click", (e) => {
        this.showOneHike(e.currentTarget.dataset.name);
      });
      el.addEventListener("touchend", () => {
        this.showOneHike(e.currentTarget.dataset.name);
      });
    });

  }
}
 