//entry point for the app
import "./styles.css";
import { screenController } from "./DOM.js";

screenController().printAvailableProject();

const addProjectButton = document.querySelector(".addProjectButton");
addProjectButton.addEventListener("click", () => {
  screenController().addProjectButton();
});
