import {
  arrOfProjects,
  addProject,
  editProjectName,
  deleteProject,
} from "./project.js";

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
  } else {
    console.log("project name does not exist");
  }

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

  return newTodo;
}

//function to delete todo from project
function deleteTodoFromProject(title, projectName) {
  const project = arrOfProjects.find((proj) => proj.name === projectName);
  if (project) {
    project.removeTask(title);
  } else {
    console.log("task does not exist");
  }
}

addProject("Default PROJECT 1");
addTodoToProject(
  "make dinner",
  "rice flour for four",
  "today",
  "medium",
  "PROJECT 1"
);
addTodoToProject(
  "make bed",
  "before you lay down",
  "today",
  "high",
  "PROJECT 1"
);

addProject("PROJECT 2");
addTodoToProject(
  "make dinner",
  "rice flour for four",
  "today",
  "medium",
  "PROJECT 2"
);
addTodoToProject(
  "make bed",
  "before you lay down",
  "today",
  "high",
  "PROJECT 2"
);
addTodoToProject(
  "make bed",
  "before you lay down",
  "today",
  "high",
  "PROJECT 2"
);
//deleteProject("PROJECT 1");

//deleteTodoFromProject("make dinner", "PROJECT 2");

editTodo(
  "new title",
  "new description",
  "23-12-24",
  "high",
  "make bed",
  "PROJECT 2"
);

editProjectName("PROJECT 2", "Default Project 2");

//Log all projects and their tasks
arrOfProjects.forEach((project) => {
  console.log(`Project: ${project.name}`);
  project.getTasks().forEach((task) => {
    console.log(`- Task: ${task.title}, Due: ${task.dueDate}`);
  });
});

export { addTodoToProject };
