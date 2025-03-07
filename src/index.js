// document.addEventListener("DOMContentLoaded", function () {});

const cardsArray = [
  {
    title: "Learn Javascript",
    desc: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. At, uscipit?`,
    time: "4:00 AM, 6 Mar 2025",
    id: "up-next",
    tags: ["high"],
  },
  {
    title: "Learn Javascript",
    desc: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. At, uscipit?`,
    time: "4:00 AM, 6 Mar 2025",
    id: "up-next",
    tags: ["high"],
  },
  {
    title: "Learn MongoDB",
    desc: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. At, uscipit?`,
    time: "5:00 AM, 10 Mar 2025",
    id: "up-next",
    tags: ["low", "office", "devops"],
  },
  {
    title: "K8 Architecture",
    desc: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. At, uscipit?`,
    time: "11:00 PM, 20 Mar 2025",
    id: "up-next",
    tags: ["medium", "personal", "rohit"],
  },
];

// addModel code start
let selectedPriority = null;
let tags = [];

function selectPriority(priority, element) {
  document
    .querySelectorAll(".high-priority, .medium-priority, .low-priority")
    .forEach((div) => {
      div.classList.remove("selected");
    });
  element.classList.add("selected");
  selectedPriority = priority;
}
document
  .getElementById("tagInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (this.value.trim() === "" || tags.length >= 2) {
        return; // Prevent adding more than 2 tags
      }
      addTag(this.value.trim());
      this.value = "";
    }
  });

function addTag(tagText) {
  if (tags.length >= 2) return;
  if (
    tagText.includes(`'`) ||
    tagText.includes(`"`) ||
    tagText.includes("`") ||
    tags.includes(tagText)
  ) {
    alert("Valid and unique tags only");
    return;
  }
  tags.push(tagText);
  console.log("tags :", tags);

  const tag = document.createElement("div");
  tag.classList.add(
    "flex",
    "items-center",
    "bg-indigo-500",
    "text-white",
    "px-3",
    "py-1",
    "rounded-full"
  );
  tag.innerHTML = `${tagText} <button onclick="removeTag(this, '${tagText}')" class="ml-2 text-sm">&times;</button>`;

  document.getElementById("tags-container").appendChild(tag);
}

function removeTag(button, tagText) {
  // Remove the tag from the array first
  tags = tags.filter((tag) => tag !== tagText);

  // Remove the tag from the UI
  button.parentElement.remove();
}

// add modal code ends
// -------------------------------------------------------------------

const par = document.getElementById("up-next-board");

const addModalBtn = document.getElementById("modal-add-btn");
const modal = document.getElementById("modal");
const removeModalBtn = document.getElementById("modal-remove-btn");
const kanbanContainer = document.getElementById("kanban-container");
const taskTitle = document.getElementById("taskTitle");
const taskDesc = document.getElementById("taskDesc");
const addTaskBtn = document.getElementById("add-task-btn");

addModalBtn.addEventListener("click", () => {
  console.log("add btn clicked");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  kanbanContainer.classList.add("blur-[1.8px]");
});

removeModalBtn.addEventListener("click", () => {
  console.log("remove clicked");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  kanbanContainer.classList.remove("blur-[1.8px]");
});

addTaskBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (
    !selectedPriority ||
    !tags.length ||
    !taskTitle.value.trim().length ||
    !taskDesc.value.trim().length
  ) {
    console.log("some fields are not filled");
    console.log(`selected priority : ${selectedPriority}`);
    console.log(`tags : ${tags}`);
    console.log(`task title : ${taskTitle.value}`);
    console.log(`task desc : ${taskDesc.value}`);
    console.log(`time  : ${getTime()}`);

    alert("Please fill all the fields first");
    return;
  }

  const title = taskTitle.value.trim();
  const desc = taskDesc.value.trim();
  const priority = selectedPriority;
  const tagsArr = tags;

  if (
    cardsArray.find(
      (card) => card.title.toLocaleLowerCase() === title.toLocaleLowerCase()
    )
  ) {
    alert("Task with same the name already exists");
    return;
  }

  const newTask = {
    title,
    desc,
    priority,
    time: getTime(),
    id: "up-next-board",
    tags: [priority.toLowerCase(), ...tagsArr],
  };

  cardsArray.push(newTask);

  taskTitle.value = "";
  taskDesc.value = "";
  tags = [];
  selectedPriority = null;
  document
    .querySelectorAll(".high-priority, .medium-priority, .low-priority")
    .forEach((div) => {
      div.classList.remove("selected");
    });
  document.getElementById("tags-container").innerText = "";

  console.log("printing cardsArr after adding : ", cardsArray);
  renderCard(cardsArray);
});

// creating add task model

addModalBtn.addEventListener("click", () => {});

renderCard(cardsArray);

function renderCard(tasks) {
  const allBoards = document.getElementsByClassName("boards");
  Array.from(allBoards).forEach((board) => (board.innerText = ""));

  for (let i = tasks.length - 1; i >= 0; i--) {
    let task = tasks[i];
    const card = document.createElement("div");

    card.classList.add(
      "card",
      "flex",
      "flex-col",
      "gap-2",
      "shadow-sm",
      "px-4",
      "py-2",
      "grainy-light"
    );

    const cardInfo = document.createElement("div");

    cardInfo.classList.add("card-info", "flex", "justify-between");
    card.appendChild(cardInfo);

    //   cardInfo childs

    const cardInfoTitleTime = document.createElement("div");
    cardInfoTitleTime.classList.add("card-info", "flex", "justify-between");
    cardInfo.appendChild(cardInfoTitleTime);

    const cardInfoTitleinner = document.createElement("div");

    const cardInfoH1 = document.createElement("h1");
    cardInfoH1.classList.add("text-xl", "font-bold");
    cardInfoH1.innerText = task.title;
    cardInfoTitleinner.appendChild(cardInfoH1);

    const cardInfoTime = document.createElement("div");
    cardInfoTime.classList.add("text-[12.8px]");
    cardInfoTime.innerText = task.time;
    cardInfoTitleinner.appendChild(cardInfoTime);

    cardInfoTitleTime.appendChild(cardInfoTitleinner);

    const cardButtons = document.createElement("div");
    cardButtons.classList.add("flex", "gap-2", "cursor-pointer");
    cardInfo.appendChild(cardButtons);

    // delete btn
    const deleteBtn = document.createElement("img");
    deleteBtn.setAttribute("src", "./assets/bin.png");
    deleteBtn.classList.add("w-7", "h-7");

    cardButtons.appendChild(deleteBtn);

    // edit btn
    const editBtn = document.createElement("img");
    editBtn.setAttribute("src", "./assets/edit.png");
    editBtn.classList.add("w-[33px]", "h-[33px]", "-my-0.5");

    cardButtons.appendChild(editBtn);

    //  card desc

    const cardDesc = document.createElement("div");
    card.classList.add("card-desc");
    cardDesc.innerText = task.desc;

    card.appendChild(cardDesc);

    // tags
    const tagsContainer = document.createElement("div");
    tagsContainer.classList.add(
      "flex",
      "gap-2",
      "flex-wrap",
      "mb-1",
      "text-sm"
    );

    card.appendChild(tagsContainer);

    for (let i = 0; i < task.tags.length; i++) {
      const tag = document.createElement("div");
      if (task.tags[i] === "high") {
        tag.classList.add(
          "rounded",
          "high-priority",
          "px-2",
          "py-0.5",
          "text-white"
        );
      } else if (task.tags[i] === "medium") {
        tag.classList.add(
          "rounded",
          "medium-priority",
          "px-2",
          "py-0.5",
          "text-white"
        );
      } else if (task.tags[i] === "low") {
        tag.classList.add(
          "rounded",
          "low-priority",
          "px-2",
          "py-0.5",
          "text-white"
        );
      } else {
        tag.classList.add(
          "rounded",
          "bg-gray-600",
          "px-2",
          "py-0.5",
          "text-white"
        );
      }
      tag.innerText = task.tags[i];
      tagsContainer.appendChild(tag);
    }

    par.appendChild(card);
  }
}

function getTime() {
  const now = new Date();

  // formatted time
  const timeOptions = { hour: "numeric", minute: "2-digit", hour12: true };
  const time = now.toLocaleTimeString("en-US", timeOptions);

  // formatted date with a short month name
  const dateOptions = { day: "2-digit", month: "short", year: "numeric" };
  const date = now.toLocaleDateString("en-GB", dateOptions);

  return `${time}, ${date}`;
}
