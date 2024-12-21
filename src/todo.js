import { arrOfProjects, createProject, deleteProject } from "./project.js";

//function to create todo
function createTodoItem(title, description, duedate, priority, projectName) {
  const task = { title, description, duedate, priority };

  const project = arrOfProjects.find((proj) => proj.name === projectName);
  if (project) {
    project.addTasks(task);
  } else {
    console.log("project name does not exist");
  }

  return task;
}

function deleteTodo(project, i) {
  //...
}

createProject("PROJECT 1");
createTodoItem(
  "make dinner",
  "rice flour for four",
  "today",
  "medium",
  "PROJECT 1"
);
createTodoItem("make bed", "before you lay down", "today", "high", "PROJECT 1");

createProject("PROJECT 2");
createTodoItem(
  "make dinner",
  "rice flour for four",
  "today",
  "medium",
  "PROJECT 2"
);
createTodoItem("make bed", "before you lay down", "today", "high", "PROJECT 2");
createTodoItem("make bed", "before you lay down", "today", "high", "PROJECT 2");

//Log all projects and their tasks
arrOfProjects.forEach((project) => {
  console.log(`Project: ${project.name}`);
  project.tasks.forEach((task) => {
    console.log(`- Task: ${task.title}, Due: ${task.duedate}`);
  });
});
