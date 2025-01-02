//entry point for the app
import "./styles.css";
import { screenController } from "./DOM.js";
import { allTasksPage } from "./allTasksPage.js";

const controller = screenController();

controller.printAvailableProject();

const addProjectButton = document.querySelector(".addProjectButton");
addProjectButton.addEventListener("click", () => {
  addProjectButton.disabled = true;
  controller.addProjectButton();
});

//all tasks page
let allTasksButton = document.querySelector("#allTasksBtn");
// Remove existing listeners by replacing the button with a clone
const newAllTasksButton = allTasksButton.cloneNode(true);
allTasksButton.replaceWith(newAllTasksButton);
allTasksButton = newAllTasksButton; // Reassign to the new button
allTasksButton.addEventListener("click", () => {
  allTasksPage();
});
