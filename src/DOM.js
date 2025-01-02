import { addProject, arrOfProjects } from "./project.js";
import {
  addTodoToProject,
  markTodoAsComplete,
  deleteTodoFromProject,
  editTodo,
} from "./todo.js";
import { formatDistanceToNow } from "date-fns";
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
    displayToAddNewProject.classList.add("displayToAddNewProject");
    const displayToAddNewProject_box1 = document.createElement("div");
    const displayToAddNewProject_box2 = document.createElement("div");
    displayToAddNewProject_box2.classList.add("displayToAddNewProject_box2");
    const newProjectInput = document.createElement("input");
    newProjectInput.classList.add("newProjectInput");
    const addNewProjectButton = document.createElement("button");
    addNewProjectButton.classList.add("addNewProjectButtons");
    const cancelButton = document.createElement("button");
    cancelButton.classList.add("addNewProjectButtons");

    addNewProjectButton.textContent = "Save";
    cancelButton.textContent = "Cancel";

    addNewProjectButton.addEventListener("click", () => {
      const projectName = newProjectInput.value.trim();

      // Check if the project name is empty
      if (!projectName) {
        alert("Project name cannot be empty!");
        return;
      }
      addProject(projectName);
      printAvailableProject();
      displayToAddNewProject.textContent = "";
      document.querySelector(".addProjectButton").disabled = false;
    });

    cancelButton.addEventListener("click", () => {
      displayToAddNewProject.textContent = "";
      displayToAddNewProject.style.display = "none";
      document.querySelector(".addProjectButton").disabled = false;
    });

    displayToAddNewProject_box1.appendChild(newProjectInput);
    displayToAddNewProject_box2.appendChild(addNewProjectButton);
    displayToAddNewProject_box2.appendChild(cancelButton);
    displayToAddNewProject.appendChild(displayToAddNewProject_box1);
    displayToAddNewProject.appendChild(displayToAddNewProject_box2);
    projectContainer.appendChild(displayToAddNewProject);
  };

  //function to edit todo
  const editTodoFunction = (taskTitle, projectName) => {
    const dialog = document.querySelector("#dialog");

    // Fetch the existing task details
    const project = arrOfProjects.find((proj) => proj.name === projectName);
    const taskToEdit = project
      .getTasks()
      .find((task) => task.title === taskTitle);

    if (!taskToEdit) {
      console.error("Task not found for editing.");
      return;
    }

    // Populate the dialog inputs with the current task values
    const taskTitleInput = document.querySelector("#task-title");
    const taskDescriptionInput = document.querySelector("#task-description");
    const taskDueDateInput = document.querySelector("#task-due-date");
    const taskPriorityInput = document.querySelector("#task-priority");

    taskTitleInput.value = taskToEdit.title;
    taskDescriptionInput.value = taskToEdit.description;
    taskDueDateInput.value = taskToEdit.dueDate;
    taskPriorityInput.value = taskToEdit.priority;

    dialog.showModal();

    const closeDialogButton = document.querySelector(".close-dialog");
    closeDialogButton.addEventListener("click", () => {
      dialog.close();
    });

    let submitTaskButton = document.querySelector("#submit-task-btn");
    submitTaskButton.textContent = "Save Changes";

    // Remove existing listeners by replacing the button with a clone
    const newSubmitTaskButton = submitTaskButton.cloneNode(true);
    submitTaskButton.replaceWith(newSubmitTaskButton);
    submitTaskButton = newSubmitTaskButton; // Reassign to the new button

    submitTaskButton.addEventListener("click", (e) => {
      e.preventDefault();

      const updatedTitle = taskTitleInput.value.trim();
      const updatedDescription =
        taskDescriptionInput.value.trim() || "No description set";
      const updatedDueDate = `Due ${formatDistanceToNow(
        taskDueDateInput.value,
        {
          addSuffix: true,
        }
      )}`;
      const updatedPriority = taskPriorityInput.value;

      editTodo(
        updatedTitle,
        updatedDescription,
        updatedDueDate,
        updatedPriority,
        taskTitle,
        projectName
      );

      dialog.close();

      // Re-render the task UI with the updated values
      const taskContainer = document.querySelector(
        `.taskContainerForEach[data-task-title="${taskTitle}"]`
      );

      if (taskContainer) {
        //styling for task divs based on task priority
        if (updatedPriority === "Low") {
          taskContainer.style.borderLeft = "2px solid green";
        }
        if (updatedPriority === "Medium") {
          taskContainer.style.borderLeft = "2px solid yellow";
        }
        if (updatedPriority === "High") {
          taskContainer.style.borderLeft = "2px solid red";
        }

        // Update the task's content
        const taskTitleElement = taskContainer.querySelector("h4");
        taskTitleElement.textContent = updatedTitle;

        const taskDescriptionElement = taskContainer.querySelector(
          ".taskContainerBox3 p"
        );
        taskDescriptionElement.textContent = updatedDescription;

        const taskDueDateElement = taskContainer.querySelector(
          ".taskContainerBox2 p"
        );
        taskDueDateElement.textContent = updatedDueDate;
      }
    });
  };

  //function to render the UI of  any task added
  const renderTaskUI = (task, projectName, taskContainer) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("taskContainerForEach");
    taskDiv.setAttribute("data-task-title", task.title); // Unique identifier for each task

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
    checkBox.checked = task.completed; // set checkbox state based on task flag

    const taskTitle = document.createElement("h4");
    taskTitle.textContent = `${task.title}`;
    //apply style for completed tasks
    if (task.completed) {
      taskDivBox1.classList.add("completed");
    }

    checkBox.addEventListener("change", () => {
      handleCompletedTask(task.title, projectName, taskDiv, checkBox);
    });

    taskDivBox1_a.appendChild(checkBox);
    taskDivBox1_a.appendChild(taskTitle);

    //edit, delete and expand icons
    const editIcon = document.createElement("img");
    editIcon.addEventListener("click", () => {
      editTodoFunction(task.title, projectName);
    });
    editIcon.classList.add("svg-icons");
    editIcon.src = editIconImg;
    taskDivBox1_b.appendChild(editIcon);
    const deleteIcon = document.createElement("img");
    //event listener of click to delete todo
    deleteIcon.addEventListener("click", () => {
      deleteTodoFromProject(task.title, projectName);
      const taskContainer = document.querySelector(
        `.taskContainerForEach[data-task-title="${task.title}"]`
      );
      if (taskContainer) {
        taskContainer.remove(); // Remove the specific task container
      }
    });
    deleteIcon.classList.add("svg-icons");
    deleteIcon.src = deleteIconImg;
    taskDivBox1_b.appendChild(deleteIcon);
    const expandIcon = document.createElement("img");
    expandIcon.addEventListener("click", () => {
      const descriptionText = taskDiv.querySelector(".taskDescriptionText");

      // Toggle description visibility
      if (
        descriptionText.style.display === "none" ||
        descriptionText.style.display === ""
      ) {
        descriptionText.style.display = "block"; // Show the description
      } else {
        descriptionText.style.display = "none"; // Hide the description
      }

      // Flip the icon (toggle a class for the flip effect)
      expandIcon.classList.toggle("flipped");
    });
    expandIcon.classList.add("svg-icons-expand");
    expandIcon.src = expandIconImg;
    taskDivBox1_b.appendChild(expandIcon);

    taskDivBox1.appendChild(taskDivBox1_a);
    taskDivBox1.appendChild(taskDivBox1_b);

    const dueDate = document.createElement("p");
    dueDate.textContent = `${task.dueDate}`;
    taskDivBox2.appendChild(dueDate);

    const taskDescription = document.createElement("p");
    taskDescription.classList.add("taskDescriptionText");
    taskDescription.textContent = `${task.description}`;
    taskDivBox3.appendChild(taskDescription);

    //styling for task divs based on task priority
    const taskPriority = task.priority;
    if (taskPriority === "Low") {
      taskDiv.style.borderLeft = "2px solid green";
    }
    if (taskPriority === "Medium") {
      taskDiv.style.borderLeft = "2px solid yellow";
    }
    if (taskPriority === "High") {
      taskDiv.style.borderLeft = "2px solid red";
    }

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
      renderTaskUI(task, project.name, taskContainer);
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
    let clearCompletedTaskButton = document.createElement("p");
    clearCompletedTaskButton.textContent = "clear completed tasks";
    bottomDiv.appendChild(clearCompletedTaskButton);
    const deleteIcon = document.createElement("img");
    deleteIcon.src = deleteIconImg;
    deleteIcon.classList.add("deleteCompletedIcon");
    bottomDiv.appendChild(deleteIcon);

    // Remove existing listeners by replacing the button with a clone
    const newClearCompletedTaskButton =
      clearCompletedTaskButton.cloneNode(true);
    clearCompletedTaskButton.replaceWith(newClearCompletedTaskButton);
    clearCompletedTaskButton = newClearCompletedTaskButton; // Reassign to the new button

    clearCompletedTaskButton.addEventListener("click", () => {
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

    contentDiv.appendChild(projectTitle);
    contentDiv.appendChild(addTaskButton);
    contentDiv.appendChild(taskContainer);
    contentDiv.appendChild(bottomDiv);
  };

  //function to add a new task to a project
  const addTask = (project, taskContainer) => {
    const dialog = document.querySelector("#dialog");

    const taskTitleInput = document.querySelector("#task-title");
    const taskDescriptionInput = document.querySelector("#task-description");
    const taskDueDateInput = document.querySelector("#task-due-date");
    const taskPriorityInput = document.querySelector("#task-priority");

    // Set the default date to today's date
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed, so add 1
    const day = String(today.getDate()).padStart(2, "0"); // Day is zero-padded

    taskTitleInput.value = "";
    taskDescriptionInput.value = "";
    taskDueDateInput.value = `${year}-${month}-${day}`;
    taskPriorityInput.value = "";

    dialog.showModal();

    const closeDialogButton = document.querySelector(".close-dialog");
    closeDialogButton.addEventListener("click", () => {
      dialog.close();
    });

    let submitTaskButton = document.querySelector("#submit-task-btn");

    // Remove existing listeners by replacing the button with a clone
    const newSubmitTaskButton = submitTaskButton.cloneNode(true);
    submitTaskButton.replaceWith(newSubmitTaskButton);
    submitTaskButton = newSubmitTaskButton; // Reassign to the new button

    submitTaskButton.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("submitting form now");

      const taskTitle_ = taskTitleInput.value;
      const taskDescription_ =
        taskDescriptionInput.value.trim() || "No description set";
      const taskDueDate_ = taskDueDateInput.value;
      const formattedDate = `Due ${formatDistanceToNow(taskDueDate_, {
        addSuffix: true,
      })}`;
      const taskPriority_ = taskPriorityInput.value;

      let newTask = addTodoToProject(
        taskTitle_,
        taskDescription_,
        formattedDate,
        taskPriority_,
        project.name
      );

      dialog.close();

      // update task container with new task
      renderTaskUI(newTask, project.name, taskContainer);
    });
  };

  //function to handle tasks marked as complete
  const handleCompletedTask = (title, projectName, taskElement, checkbox) => {
    markTodoAsComplete(title, projectName);

    const taskTitle = taskElement.querySelector(".taskContainerBox1");
    if (checkbox.checked) {
      taskTitle.classList.add("completed");
    } else {
      taskTitle.classList.remove("completed");
    }
  };

  return { printAvailableProject, addProjectButton };
}

export { screenController };
