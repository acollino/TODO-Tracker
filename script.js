const list = document.querySelector("#list");
const submitForm = document.querySelector("form");
const entryBox = document.querySelector("#input-box");
const appContain = document.querySelector("#app-container");

submitForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (entryBox.value != "") {
    addListItem(entryBox.value);
    entryBox.value = "";
  }
  updateStorage();
});

function addListItem(textEntry, completed) {
  if (list.children.length >= 1) {
    list.lastChild.style.borderBottom = "2px solid rgb(194, 194, 194)";
  }
  let newItem = document.createElement("li");
  newItem.classList.add("list-entry");
  let todoText = document.createElement("span");
  todoText.textContent = textEntry;
  if (completed) {
    todoText.classList.add("crossed");
  }
  let newButton = document.createElement("button");
  newButton.classList.add("list-button", "material-icons-round", "trash");
  newButton.textContent = "delete_forever";
  newItem.append(todoText);
  newItem.append(newButton);
  list.append(newItem);
  setTimeout(function () {
    newItem.classList.toggle("fadeIn");
  }, 50);
}

list.addEventListener("click", function (e) {
  if (e.target.tagName == "BUTTON") {
    let completedElement = e.target.parentElement;
    if (completedElement.nextSibling == null) {
      if (completedElement.previousSibling != null) {
        completedElement.previousSibling.style.borderBottom = "none";
      }
    } 
    completedElement.remove();
  }
  else if (e.target.tagName == "SPAN") {
    e.target.classList.toggle("crossed");
  }
  else if (e.target.tagName == "LI") {
    e.target.querySelector("span").classList.toggle("crossed");
  }
  updateStorage();
});

function updateStorage() {
  let tasks = list.querySelectorAll("span");
  localStorage.clear();
  for (let i = 0; i < tasks.length; i++) {
    let toStore = { task: tasks[i].textContent, completed: tasks[i].classList.contains("crossed") };
    localStorage.setItem("task" + i, JSON.stringify(toStore));
  }
}

function readStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    let fromStore = JSON.parse(localStorage.getItem("task" + i));
    addListItem(fromStore.task, fromStore.completed);
  }
}

window.addEventListener("load", readStorage);

document.querySelector("#clear-button").addEventListener("click", function () {
  localStorage.clear();
  list.textContent = "";
});