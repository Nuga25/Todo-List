import { addProject, arrOfProjects } from "./project.js";
import { addTodoToProject } from "./todo.js";

function screenController() {
  //function to print available projects in array to the screen
  const printAvailableProject = () => {
    const projectContainer = document.querySelector("#projectDiv");
    projectContainer.textContent = "";

    arrOfProjects.forEach((proj) => {
      const projectDiv = document.createElement("div");
      projectDiv.classList.add("projectName");
      projectDiv.textContent = proj.name;

      //click event to open project and display tasks
      projectDiv.addEventListener("click", () => {
        openProject(proj);
      });

      projectContainer.appendChild(projectDiv);
    });
  };

  //function to create a new project
  const addProjectButton = () => {
    const projectContainer = document.querySelector("#projectDiv");
    const displayToAddNewProject = document.createElement("div");
    const newProjectInput = document.createElement("input");
    const addNewProjectButton = document.createElement("button");

    addNewProjectButton.textContent = "save new project";

    addNewProjectButton.addEventListener("click", () => {
      const projectName = newProjectInput.value;
      addProject(projectName);
      printAvailableProject();
      displayToAddNewProject.textContent = "";
    });

    displayToAddNewProject.appendChild(newProjectInput);
    displayToAddNewProject.appendChild(addNewProjectButton);
    projectContainer.appendChild(displayToAddNewProject);
  };

  //function to open project to display its tasks
  const openProject = (project) => {
    const contentDiv = document.querySelector("#content");
    contentDiv.textContent = "";

    const projectTitle = document.createElement("div");
    projectTitle.textContent = project.name;

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("taskContainer");

    //render each task of clicked project
    project.getTasks().forEach((task) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");
      taskDiv.textContent = `${task.title} - ${task.dueDate}`;

      taskContainer.appendChild(taskDiv);
    });

    //create "add new task" button
    const addTaskButton = document.createElement("button");
    addTaskButton.classList.add("addTaskBtn");
    addTaskButton.textContent = "Add New Task";

    addTaskButton.addEventListener("click", () => {
      addTask(project);
    });

    contentDiv.appendChild(projectTitle);
    contentDiv.appendChild(taskContainer);
    contentDiv.appendChild(addTaskButton);
  };

  //function to add a new task to a project
  const addTask = (project) => {
    const taskTitle = prompt("Enter task title:");
    const taskDescription = prompt("Enter task description:");
    const taskDueDate = prompt("Enter due date:");
    const taskPriority = prompt("Enter priority:");

    addTodoToProject(
      taskTitle,
      taskDescription,
      taskDueDate,
      taskPriority,
      project.name
    );

    // Refresh the task list
    openProject(project);
  };

  return { printAvailableProject, addProjectButton };
}

export { screenController };
