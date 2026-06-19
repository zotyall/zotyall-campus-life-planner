// Export allows this function to be used in other JS files (app.js, tests.html)

export function validateTitle(title) { 
    //I use regex to make sure title has no extra spaces at start or end
    const regex = /^\S(?:.*\S)?$/;
     // .test() checks if the input matches the rule
    return regex.test(title);
  }
  
  export function validateDuration(duration) {
    // This checks if duration is a valid number (like 10, 20.5)
    const regex = /^(0|[1-9]\d*)(\.\d{1,2})?$/;

    return regex.test(duration);
  }
  
  export function validateDate(date) {
    // This makes sure the date is in YYYY-MM-DD format
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    return regex.test(date);
  }
  
  export function validateTag(tag) {
    // This allows only letters, spaces, and hyphens
    const regex = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
    
    return regex.test(tag);
  }