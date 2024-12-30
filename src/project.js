//function to create new projects
function createProject(name) {
  const tasks = [];
  const completedTasks = [];

  const addTask = (task) => {
    tasks.push(task);
  };

  const removeTask = (taskName) => {
    const index = tasks.findIndex((task) => task.title === taskName);
    tasks.splice(index, 1);
  };

  const markTaskAsComplete = (taskName) => {
    const taskIndex = tasks.findIndex((task) => task.title === taskName);
    if (taskIndex > -1) {
      const [completedTask] = tasks.splice(taskIndex, 1);
      completedTasks.push({ ...completedTask });
    } else {
      console.log(`Task "${taskName}" not found.`);
    }
  };

  const getTasks = () => {
    return [...tasks];
  };

  const getCompletedTasks = () => {
    return [...completedTasks];
  };

  return {
    name,
    addTask,
    removeTask,
    markTaskAsComplete,
    getTasks,
    getCompletedTasks,
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
