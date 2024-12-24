//function to create new projects
function createProject(name) {
  const tasks = [];

  const addTask = (task) => {
    tasks.push(task);
  };

  const removeTask = (taskName) => {
    const index = tasks.findIndex((task) => task.title === taskName);
    tasks.splice(index, 1);
  };

  const getTasks = () => {
    return [...tasks];
  };

  return {
    name,
    addTask,
    removeTask,
    getTasks,
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
