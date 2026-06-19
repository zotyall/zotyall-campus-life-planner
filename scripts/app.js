import { saveTasks, loadTasks } from "./storage.js";

const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const exportBtn = document.getElementById("exportBtn");
const importFile = document.getElementById("importFile");
const totalTasks = document.getElementById("totalTasks");
const totalDuration = document.getElementById("totalDuration");
const topTag = document.getElementById("topTag");

let tasks = loadTasks();

// Show saved tasks when page loads
renderTasks();
updateDashboard();
/*
  Check that an imported task has the required fields
*/
function isValidTask(task) {

    return (
        task.id !== undefined &&
        typeof task.title === "string" &&
        typeof task.date === "string" &&
        task.duration !== undefined &&
        typeof task.tag === "string"
    );

}

/*
  Add task
*/
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const date = document.getElementById("dueDate").value;
  const duration = document.getElementById("duration").value;
  const tag = document.getElementById("tag").value;

  const task = {
    id: Date.now(),
    title,
    date,
    duration,
    tag
  };

  tasks.push(task);

  saveTasks(tasks);
  renderTasks();
  updateDashboard();
  form.reset();
});

/*
  Show tasks on screen
*/
function renderTasks(filteredTasks = tasks) {
  taskList.innerHTML = "";

  filteredTasks.forEach(task => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.date}</p>
      <p>${task.duration} minutes</p>
      <p>${task.tag}</p>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;

    taskList.appendChild(div);
  });
}

/*
  Delete task
*/
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);

  saveTasks(tasks);
  renderTasks();
  updateDashboard();
}

function updateDashboard() {

    // Total number of tasks
    totalTasks.textContent = `Total Tasks: ${tasks.length}`;

    // Total duration
    const duration = tasks.reduce((sum, task) => {
        return sum + Number(task.duration);
    }, 0);

    totalDuration.textContent = `Total Duration: ${duration} minutes`;

    // Find the most common tag
    const tagCount = {};

    tasks.forEach(task => {

        if (tagCount[task.tag]) {
            tagCount[task.tag]++;
        } else {
            tagCount[task.tag] = 1;
        }

    });

    let bestTag = "None";
    let highest = 0;

    for (let tag in tagCount) {

        if (tagCount[tag] > highest) {
            highest = tagCount[tag];
            bestTag = tag;
        }

    }

    topTag.textContent = `Top Tag: ${bestTag}`;

}

/*
  SEARCH INPUT EVENT
*/
searchInput.addEventListener("input", function () {

  const pattern = searchInput.value;

  let filtered = tasks;

  if (pattern) {

    try {

      const regex = new RegExp(pattern, "i");

      filtered = tasks.filter(task =>
        regex.test(task.title) ||
        regex.test(task.tag)
      );

    } catch (e) {

      filtered = tasks;

    }

  }

  renderTasks(filtered);

});

/*
  EXPORT TASKS AS JSON
*/
exportBtn.addEventListener("click", function () {

  const data = JSON.stringify(tasks, null, 2);

  const blob = new Blob([data], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "tasks.json";

  link.click();

  URL.revokeObjectURL(url);

});

/*
  IMPORT TASKS FROM JSON
*/
importFile.addEventListener("change", function (event) {

    const file = event.target.files[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {

        try {

            const importedTasks = JSON.parse(e.target.result);

            // Check that the JSON is an array
            if (
                !Array.isArray(importedTasks) ||
                !importedTasks.every(isValidTask)
            ) {
                throw new Error("Invalid file");
            }

            tasks = importedTasks;

            saveTasks(tasks);

            renderTasks();
            updateDashboard();

            alert("Tasks imported successfully!");

        } catch (error) {

            alert("Invalid JSON file.");

        }

    };

    reader.readAsText(file);

});