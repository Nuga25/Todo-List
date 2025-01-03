//entry point for the app
import "./styles.css";
import { pageLoad } from "./pageLoad.js";
import { screenController } from "./DOM.js";
import { allTasksPage } from "./allTasksPage.js";
import { tasksDueInSevenDays } from "./tasksDueInSevenDays.js";
import { tasksDueToday } from "./tasksDueToday.js";

const hamburgerMenu = document.querySelector(".hamburger-menu");
hamburgerMenu.addEventListener("click", () => {
  const sidebar = document.querySelector(".sidebar");

  // Toggle description visibility
  if (sidebar.style.display === "none" || sidebar.style.display === "") {
    sidebar.style.display = "block"; // Show the description
  } else {
    sidebar.style.display = "none"; // Hide the description
  }

  // Flip the icon (toggle a class for the flip effect)
  hamburgerMenu.classList.toggle("flipped");
});

//TO ADD CLASS OF ACTIVE TO SIDEBAR MENU
document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".sidebar-menus");

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      navButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to the clicked button
      button.classList.add("active");
    });
  });
});

//Display on page load
document.addEventListener("DOMContentLoaded", () => {
  pageLoad();
});

const controller = screenController();
controller.printAvailableProject(); //REMOVE THIS

const addProjectButton = document.querySelector(".addProjectButton");
addProjectButton.addEventListener("click", () => {
  addProjectButton.disabled = true;
  controller.addProjectButton();
});

//ALL TASKS PAGE
let allTasksButton = document.querySelector("#allTasksBtn");
// Remove existing listeners by replacing the button with a clone
const newAllTasksButton = allTasksButton.cloneNode(true);
allTasksButton.replaceWith(newAllTasksButton);
allTasksButton = newAllTasksButton; // Reassign to the new button
allTasksButton.addEventListener("click", () => {
  allTasksPage();
});

//TASKS DUE IN SEVEN DAYS PAGE
let nextSevenDaysTasksButton = document.querySelector("#nextSevenDaysBtn");
// Remove existing listeners by replacing the button with a clone
const newNextSevenDaysTasksButton = nextSevenDaysTasksButton.cloneNode(true);
nextSevenDaysTasksButton.replaceWith(newNextSevenDaysTasksButton);
nextSevenDaysTasksButton = newNextSevenDaysTasksButton; // Reassign to the new button
nextSevenDaysTasksButton.addEventListener("click", () => {
  tasksDueInSevenDays();
});

//TASKS DUE TODAY PAGE
let taskDueTodayButton = document.querySelector("#dueTodayBtn");
// Remove existing listeners by replacing the button with a clone
const newTaskDueTodayButton = taskDueTodayButton.cloneNode(true);
taskDueTodayButton.replaceWith(newTaskDueTodayButton);
taskDueTodayButton = newTaskDueTodayButton; // Reassign to the new button
taskDueTodayButton.addEventListener("click", () => {
  tasksDueToday();
});
