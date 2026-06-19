const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

let tasks = [];

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
  renderTasks();
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
        <p>${task.duration}</p>
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
  renderTasks();
}

/*
  SEARCH INPUT EVENT
  This runs whenever user types in search box
*/
searchInput.addEventListener("input", function () {

    const pattern = searchInput.value;
  
    let filtered = tasks;
  
    if (pattern) {
      try {
  
        // ✅ REGEX GOES HERE (inside this block)
        const regex = new RegExp(pattern, "i");
  
        filtered = tasks.filter(task =>
          regex.test(task.title) ||
          regex.test(task.tag)
        );
  
      } catch (e) {
        filtered = tasks; // if regex is invalid
      }
    }
  
    renderTasks(filtered);
  });