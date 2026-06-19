/*
  This file stores all tasks in memory (temporary storage).
  Later we will connect it to localStorage in M6.
*/

export let tasks = [];

// Add a task
export function addTask(task) {
  tasks.push(task);
}

// Delete a task
export function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
}