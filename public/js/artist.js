// TODO: whenever showToggle is toggled on, 
const showToggle = document.querySelector(".form-check-input");

checkbox.addEventListener('change', function() {
  if (this.checked) {
    console.log("Going to show");
    // Add showId to User table
  } else {
    console.log("Not going to show");
    // Delete showId from User table
  }
});