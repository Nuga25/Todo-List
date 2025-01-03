//function to create new projects
function createProject(name) {
  const tasks = [];

  const addTask = (task) => {
    task.completed = false;
    tasks.push(task);
  };

  const removeTask = (taskName) => {
    const index = tasks.findIndex((task) => task.title === taskName);
    if (index > -1) tasks.splice(index, 1);
  };

  const markTaskAsComplete = (taskName) => {
    const task = tasks.find((task) => task.title === taskName);
    if (task) {
      task.completed = !task.completed; // toggle completion status
    } else {
      console.log(`Task "${taskName}" not found.`);
    }
  };

  const getTasks = () => {
    return [...tasks];
  };

  const getCompletedTasks = () => {
    return tasks.filter((task) => task.completed);
  };

  const getPendingTasks = () => {
    return tasks.filter((task) => !task.completed);
  };

  return {
    name,
    addTask,
    removeTask,
    markTaskAsComplete,
    getTasks,
    getCompletedTasks,
    getPendingTasks,
  };
}

let arrOfProjects = [];

//function to add project to array
function addProject(name) {
  const project = createProject(name);
  arrOfProjects.push(project);
  return project;
}

//function to edit project name
function editProjectName(oldName, newName) {
  const project = arrOfProjects.find((proj) => proj.name === oldName);
  return (project.name = newName);
}

//function to delete project
function deleteProject(name) {
  return (arrOfProjects = arrOfProjects.filter((proj) => proj.name !== name));
}

export { arrOfProjects, addProject, editProjectName, deleteProject };
