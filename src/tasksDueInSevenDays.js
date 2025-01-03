import { arrOfProjects } from "./project.js";
import { screenController } from "./DOM.js";
import { deleteTodoFromProject } from "./todo.js";
import deleteIconImg from "./assets/icons/trash-can-outline.svg";
import illustrationImg from "./assets/images/Empty-amico.svg";

export function tasksDueInSevenDays() {
  let contentPage = document.querySelector("#content");
  contentPage.textContent = "";
  const controller = screenController();

  const today = new Date(); // Current date
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(today.getDate() + 7);

  const projects = arrOfProjects;
  projects.forEach((project) => {
    project
      .getTasks()
      .filter((task) => {
        return (
          new Date(task.dueDate) >= today &&
          new Date(task.dueDate) <= sevenDaysFromNow
        );
      })
      .forEach((task) => {
        controller.renderTaskUI(task, project.name, contentPage);
      });
  });

  //clear completed task button
  const bottomDiv = document.createElement("div");
  bottomDiv.classList.add("clearCompletedTasksBox");
  let clearCompletedTaskButton = document.createElement("p");
  clearCompletedTaskButton.textContent = "clear completed tasks";
  bottomDiv.appendChild(clearCompletedTaskButton);
  const deleteIcon = document.createElement("img");
  deleteIcon.src = deleteIconImg;
  deleteIcon.classList.add("deleteCompletedIcon");
  bottomDiv.appendChild(deleteIcon);

  // Remove existing listeners by replacing the button with a clone
  const newClearCompletedTaskButton = clearCompletedTaskButton.cloneNode(true);
  clearCompletedTaskButton.replaceWith(newClearCompletedTaskButton);
  clearCompletedTaskButton = newClearCompletedTaskButton; // Reassign to the new button

  clearCompletedTaskButton.addEventListener("click", () => {
    projects.forEach((project) => {
      project.getCompletedTasks().forEach((task) => {
        deleteTodoFromProject(task.title, project.name);
        // Find the container corresponding to the completed task
        const taskContainer = document.querySelector(
          `.taskContainerForEach[data-task-title="${task.title}"]`
        );
        if (taskContainer) {
          taskContainer.remove(); // Remove the specific task container
        }
      });
    });
  });

  if (contentPage.textContent !== "") {
    contentPage.appendChild(bottomDiv);
  } else {
    const Div = document.createElement("div");
    Div.classList.add("tasksDueTodayDiv");
    const container = document.createElement("div");

    const illustrationEmptyImg = document.createElement("img");
    illustrationEmptyImg.src = illustrationImg;
    illustrationEmptyImg.width = "450";
    const paragraphText = document.createElement("p");
    paragraphText.textContent = "Tasks due in seven days would show up here";
    paragraphText.style.color = "#2e073f";
    paragraphText.style.fontSize = "18px";
    paragraphText.style.fontStyle = "italic";

    container.appendChild(illustrationEmptyImg);
    container.appendChild(paragraphText);
    Div.appendChild(container);
    contentPage.appendChild(Div);
  }
}
