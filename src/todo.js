import { arrOfProjects } from "./project.js";
import { saveToLocalStorage } from "./localStorage.js";

//function to create todo
function createTodoItem(title, description, dueDate, priority) {
  return { title, description, dueDate, priority };
}

//function to add todo to a project
function addTodoToProject(title, description, dueDate, priority, projectName) {
  const task = createTodoItem(title, description, dueDate, priority);

  const project = arrOfProjects.find((proj) => proj.name === projectName);
  if (project) {
    project.addTask(task);
    console.log(`all tasks are: `, project.getTasks());
  } else {
    console.log("project name does not exist");
  }

  console.log("Task is : ", task);

  saveToLocalStorage("projects", arrOfProjects);

  return task;
}

//function to edit todo
function editTodo(
  newTitle,
  newDescription,
  newDueDate,
  newPriority,
  todoTitle,
  projectName
) {
  const project = arrOfProjects.find((proj) => proj.name === projectName);
  const newTodo = project.getTasks().find((task) => task.title === todoTitle); // or `todo.title`

  newTodo.title = newTitle;
  newTodo.description = newDescription;
  newTodo.dueDate = newDueDate;
  newTodo.priority = newPriority;

  saveToLocalStorage("projects", arrOfProjects);
  return newTodo;
}

function markTodoAsComplete(title, projectName) {
  const project = arrOfProjects.find((proj) => proj.name === projectName);
  if (project) {
    project.markTaskAsComplete(title);
    saveToLocalStorage("projects", arrOfProjects);
  } else {
    console.log("cannot mark task as complete because project not found");
  }
}

//function to delete todo from project
function deleteTodoFromProject(title, projectName) {
  const project = arrOfProjects.find((proj) => proj.name === projectName);
  if (project) {
    project.removeTask(title);
  } else {
    console.log("task does not exist");
  }

  saveToLocalStorage("projects", arrOfProjects);
}

export {
  addTodoToProject,
  markTodoAsComplete,
  deleteTodoFromProject,
  editTodo,
};
