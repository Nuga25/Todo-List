let arrOfProjects = [];

function createProject(name) {
  const project = {
    name: name,
    tasks: [],
    addTasks(task) {
      this.tasks.push(task);
    },
    removeTasks(taskName) {
      this.tasks = this.tasks.filter((task) => task !== taskName);
    },
  };

  arrOfProjects.push(project);
  return project;
}

function deleteProject(name) {
  return (arrOfProjects = arrOfProjects.filter((proj) => proj.name !== name));
}

export { arrOfProjects, createProject, deleteProject };
