import {
    validateTitle,
    validateDuration,
    validateDate,
    validateTag
  } from "./validators.js";
  
  /*
    I get the form from HTML so I can control it using JavaScript
  */
  const form = document.getElementById("taskForm");
  /*
    This runs when the user clicks "Add Task"
  */
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // I stop page from refreshing
  
    // I get values typed by the user
    const title = document.getElementById("title").value;
    const dueDate = document.getElementById("dueDate").value;
    const duration = document.getElementById("duration").value;
    const tag = document.getElementById("tag").value;
  
    // I assume form is correct first
    let valid = true;
  
    // TITLE CHECK
    if (!validateTitle(title)) {
      document.getElementById("titleError").textContent = "Please enter a valid title";
      valid = false;
    } else {
      document.getElementById("titleError").textContent = "";
    }
  
    // Date check
    if (!validateDate(dueDate)) {
      document.getElementById("dateError").textContent = "Please enter a valid date";
      valid = false;
    } else {
      document.getElementById("dateError").textContent = "";
    }
  
    // Duraction check
    if (!validateDuration(duration)) {
      document.getElementById("durationError").textContent = "Please enter a valid number";
      valid = false;
    } else {
      document.getElementById("durationError").textContent = "";
    }
  
    // TAG CHECK
    if (!validateTag(tag)) {
      document.getElementById("tagError").textContent = "Please enter a valid tag";
      valid = false;
    } else {
      document.getElementById("tagError").textContent = "";
    }
  
    /*
      If everything is correct, I show a success message
    */
    if (valid) {
      alert("Task added successfully");
      form.reset(); // clears the form
    }
  });