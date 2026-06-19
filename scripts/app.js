import { saveTasks, loadTasks } from "./storage.js";

/* DOM */
const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");

const exportBtn = document.getElementById("exportBtn");
const importFile = document.getElementById("importFile");

const totalTasks = document.getElementById("totalTasks");
const totalDuration = document.getElementById("totalDuration");
const topTag = document.getElementById("topTag");

/* DATA */
let tasks = loadTasks();

/* INIT */
renderTasks();
updateDashboard();

/* ADD TASK */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = {
    id: Date.now(),
    title: document.getElementById("title").value,
    date: document.getElementById("dueDate").value,
    duration: Number(document.getElementById("duration").value),
    tag: document.getElementById("tag").value
  };

  tasks.push(task);

  saveTasks(tasks);
  renderTasks();
  updateDashboard();

  form.reset();
});

/* RENDER */
function renderTasks(list = tasks) {
  taskList.innerHTML = "";

  list.forEach(task => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.date}</p>
      <p>${task.duration} min</p>
      <p>${task.tag}</p>
    `;

    const btn = document.createElement("button");
    btn.textContent = "Delete";

    btn.addEventListener("click", () => deleteTask(task.id));

    div.appendChild(btn);
    taskList.appendChild(div);
  });
}

/* DELETE */
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);

  saveTasks(tasks);
  renderTasks();
  updateDashboard();
}

/* DASHBOARD */
function updateDashboard() {
  totalTasks.textContent = `Total Tasks: ${tasks.length}`;

  const total = tasks.reduce((sum, t) => sum + Number(t.duration), 0);
  totalDuration.textContent = `Total Duration: ${total} minutes`;

  const counts = {};
  tasks.forEach(t => {
    counts[t.tag] = (counts[t.tag] || 0) + 1;
  });

  let top = "None";
  let max = 0;

  for (let key in counts) {
    if (counts[key] > max) {
      max = counts[key];
      top = key;
    }
  }

  topTag.textContent = `Top Tag: ${top}`;
}

/* SEARCH (REGEX SAFE) */
searchInput.addEventListener("input", () => {
  try {
    const regex = new RegExp(searchInput.value, "i");

    const filtered = tasks.filter(
      t => regex.test(t.title) || regex.test(t.tag)
    );

    renderTasks(filtered);
  } catch {
    renderTasks(tasks);
  }
});

/* EXPORT */
exportBtn.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(tasks, null, 2)], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "tasks.json";
  a.click();

  URL.revokeObjectURL(url);
});

/* IMPORT */
importFile.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);

      if (!Array.isArray(data)) throw new Error();

      tasks = data;

      saveTasks(tasks);
      renderTasks();
      updateDashboard();

      alert("Import successful!");
    } catch {
      alert("Invalid file");
    }
  };

  reader.readAsText(file);
});