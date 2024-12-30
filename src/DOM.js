import { addProject, arrOfProjects } from "./project.js";
import { addTodoToProject } from "./todo.js";
import editIconImg from "./assets/icons/file-edit-outline.svg";
import deleteIconImg from "./assets/icons/trash-can-outline.svg";
import expandIconImg from "./assets/icons/chevron-down.svg";

function screenController() {
  //function to print created projects in array to the screen
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

  //function to render the UI of  any task added
  const renderTaskUI = (task, taskContainer) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("taskContainerForEach");
    const taskDivBox1 = document.createElement("div");
    taskDivBox1.classList.add("taskContainerBox1");
    const taskDivBox2 = document.createElement("div");
    taskDivBox2.classList.add("taskContainerBox2");
    const taskDivBox3 = document.createElement("div");
    taskDivBox3.classList.add("taskContainerBox3");

    const taskDivBox1_a = document.createElement("div"); //for task title and checkbox
    taskDivBox1_a.classList.add("taskDivBox1_a");
    const taskDivBox1_b = document.createElement("div"); //for edit, delete and expand icon
    taskDivBox1_b.classList.add("taskDivBox1_b");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    taskDivBox1_a.appendChild(checkBox);

    const taskTitle = document.createElement("h4");
    taskTitle.textContent = `${task.title}`;
    taskDivBox1_a.appendChild(taskTitle);

    //edit, delete and expand icons
    const editIcon = document.createElement("img");
    editIcon.classList.add("svg-icons");
    editIcon.src = editIconImg;
    taskDivBox1_b.appendChild(editIcon);
    const deleteIcon = document.createElement("img");
    deleteIcon.classList.add("svg-icons");
    deleteIcon.src = deleteIconImg;
    taskDivBox1_b.appendChild(deleteIcon);
    const expandIcon = document.createElement("img");
    expandIcon.classList.add("svg-icons-expand");
    expandIcon.src = expandIconImg;
    taskDivBox1_b.appendChild(expandIcon);

    taskDivBox1.appendChild(taskDivBox1_a);
    taskDivBox1.appendChild(taskDivBox1_b);

    const dueDate = document.createElement("p");
    dueDate.textContent = `${task.dueDate}`;
    taskDivBox2.appendChild(dueDate);

    const taskDescription = document.createElement("p");
    taskDescription.textContent = `${task.description}`;
    taskDivBox3.appendChild(taskDescription);

    taskDiv.appendChild(taskDivBox1);
    taskDiv.appendChild(taskDivBox2);
    taskDiv.appendChild(taskDivBox3);
    taskContainer.appendChild(taskDiv);
  };

  //function to open project to display its tasks
  const openProject = (project) => {
    const contentDiv = document.querySelector("#content");
    contentDiv.textContent = "";

    const projectTitle = document.createElement("h2");
    projectTitle.textContent = project.name;

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("taskContainer");

    //initial render of tasks
    project.getTasks().forEach((task) => {
      renderTaskUI(task, taskContainer);
    });

    //create "add new task" button
    const addTaskButton = document.createElement("button");
    addTaskButton.classList.add("addTaskBtn");
    addTaskButton.textContent = "Add New Task";

    addTaskButton.addEventListener("click", () => {
      addTask(project, taskContainer);
    });

    //clear completed task button
    const bottomDiv = document.createElement("div");
    bottomDiv.classList.add("clearCompletedTasksBox");
    const clearCompletedTaskButton = document.createElement("p");
    clearCompletedTaskButton.textContent = "clear completed tasks";
    bottomDiv.appendChild(clearCompletedTaskButton);
    const deleteIcon = document.createElement("img");
    deleteIcon.src = deleteIconImg;
    deleteIcon.classList.add("deleteCompletedIcon");
    bottomDiv.appendChild(deleteIcon);

    contentDiv.appendChild(projectTitle);
    contentDiv.appendChild(addTaskButton);
    contentDiv.appendChild(taskContainer);
    contentDiv.appendChild(bottomDiv);
  };

  //function to add a new task to a project
  const addTask = (project, taskContainer) => {
    const dialog = document.querySelector("#dialog");
    dialog.showModal();

    const closeDialogButton = document.querySelector(".close-dialog");
    closeDialogButton.addEventListener("click", () => {
      dialog.close();
    });

    const submitTaskButton = document.querySelector("#submit-task-btn");
    submitTaskButton.addEventListener("click", (e) => {
      e.preventDefault();

      const taskTitle_ = document.querySelector("#task-title").value;
      const taskDescription_ =
        document.querySelector("#task-description").value.trim() ||
        "No description set";
      const taskDueDate_ = document.querySelector("#task-due-date").value;
      const taskPriority_ = document.querySelector("#task-priority").value;

      const newTask = addTodoToProject(
        taskTitle_,
        taskDescription_,
        taskDueDate_,
        taskPriority_,
        project.name
      );

      dialog.close();

      // update task container with new task
      renderTaskUI(newTask, taskContainer);
    });
  };

  return { printAvailableProject, addProjectButton };
}

export { screenController };
