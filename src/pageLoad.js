import pageLoadImg from "./assets/images/personal-goals-checklist.svg";

export function pageLoad() {
  let contentPage = document.querySelector("#content");

  const container = document.createElement("div");
  container.classList.add("pageLoadDiv");

  const contentPage_box = document.createElement("div");
  const contentPage_a = document.createElement("div");
  const contentPage_b = document.createElement("div");

  const welcomeText = document.createElement("h1");
  welcomeText.classList.add("welcomeText");
  welcomeText.textContent = "Welcome to PlanIt";
  const welcomeParagraph1 = document.createElement("p");
  welcomeParagraph1.classList.add("welcomeParagraph1");
  welcomeParagraph1.textContent =
    "Your ultimate companion for staying organized and on top of your tasks!";
  const welcomeParagraph2 = document.createElement("p");
  welcomeParagraph2.classList.add("welcomeParagraph2");
  welcomeParagraph2.textContent =
    "create a new project and add tasks to get started";

  contentPage_a.appendChild(welcomeText);
  contentPage_a.appendChild(welcomeParagraph1);
  contentPage_a.appendChild(welcomeParagraph2);

  const illustrationImg = document.createElement("img");
  illustrationImg.classList.add("pageLoadImg");
  illustrationImg.src = pageLoadImg;
  illustrationImg.width = "450";
  contentPage_b.appendChild(illustrationImg);

  contentPage_box.appendChild(contentPage_b);
  contentPage_box.appendChild(contentPage_a);
  container.appendChild(contentPage_box);
  contentPage.appendChild(container);
}
