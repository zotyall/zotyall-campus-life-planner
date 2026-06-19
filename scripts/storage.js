const KEY = "campus_tasks";

export function saveTasks(tasks) {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}

export function loadTasks() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}