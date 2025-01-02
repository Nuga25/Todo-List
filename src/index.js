//entry point for the app
import "./styles.css";
import { screenController } from "./DOM.js";

const controller = screenController();

controller.printAvailableProject();

const addProjectButton = document.querySelector(".addProjectButton");
addProjectButton.addEventListener("click", () => {
  addProjectButton.disabled = true;
  controller.addProjectButton();
});
