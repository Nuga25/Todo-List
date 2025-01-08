function saveToLocalStorage(key, projects) {
  //localStorage.setItem(key, JSON.stringify(data));

  const serializableProjects = projects.map((project) => ({
    name: project.name,
    tasks: project.getTasks(), // Serialize tasks using getTasks method
  }));

  localStorage.setItem(key, JSON.stringify(serializableProjects));
}

function loadFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
}

export { saveToLocalStorage, loadFromLocalStorage };
