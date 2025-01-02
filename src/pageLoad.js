export function pageLoad() {
  let contentPage = document.querySelector("#content");

  const welcomeText = document.createElement("h2");
  welcomeText.textContent = "Welcome to PlanIt";
  const welcomeParagraph1 = document.createElement("p");
  welcomeParagraph1.textContent = "your all in one task manager blah blah blah";
  const welcomeParagraph2 = document.createElement("p");
  welcomeParagraph1.textContent =
    "create a new project and add tasks to get started";

  contentPage.appendChild(welcomeText);
  contentPage.appendChild(welcomeParagraph1);
  contentPage.appendChild(welcomeParagraph2);
}
