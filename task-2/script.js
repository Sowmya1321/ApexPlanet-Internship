// Add Task Logic
function addTask() {
  const input = document.getElementById('taskInput');
  const task = input.value.trim();
  if (!task) {
    alert("Please enter a destination.");
    return;
  }

  const li = document.createElement('li');
  li.innerHTML = `<span>${task}</span> <button onclick="this.parentElement.remove()">Remove</button>`;
  document.getElementById('taskList').appendChild(li);
  input.value = '';
}

// Form Validation Logic
function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const interest = document.getElementById('interest').value.trim();
  const message = document.getElementById('message').value.trim();
  const formMessage = document.getElementById('formMessage');

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (!name || !email || !interest) {
    formMessage.textContent = "Please fill in all required fields.";
    formMessage.style.color = "crimson";
    return false;
  }

  if (!emailPattern.test(email)) {
    formMessage.textContent = "Invalid email format.";
    formMessage.style.color = "crimson";
    return false;
  }

  formMessage.textContent = "Thanks! We’ll get back to you soon.";
  formMessage.style.color = "#20bf6b";
  return false; // Prevent actual form submission
}
