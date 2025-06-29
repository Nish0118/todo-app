let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

function saveToLocalStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function addTodo() {
  const todoInput = document.getElementById("todo-input");
  const todoDate = document.getElementById("todo-date");

  if (todoInput.value.trim() === "") return;

  todoList.push({
    item: todoInput.value.trim(),
    dueDate: todoDate.value,
    completed: false,
  });

  todoInput.value = "";
  todoDate.value = "";
  saveToLocalStorage();
  displayItems();
}

function displayItems() {
  const container = document.querySelector(".todo-container");
  container.innerHTML = "";

  todoList.forEach((todo, index) => {
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo-item" + (todo.completed ? " completed" : "");

    todoDiv.innerHTML = `
      <input type="checkbox" ${todo.completed ? "checked" : ""} onchange="toggleComplete(${index})" />
      <div class="todo-text">${todo.item}</div>
      <div class="todo-date">${todo.dueDate}</div>
      <div class="todo-buttons">
        <button class="btn btn-edit" onclick="editTodo(${index})">✏️</button>
        <button class="btn btn-delete" onclick="deleteTodo(${index})">❌</button>
      </div>
    `;

    container.appendChild(todoDiv);
  });
}

function toggleComplete(index) {
  todoList[index].completed = !todoList[index].completed;
  saveToLocalStorage();
  displayItems();
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  saveToLocalStorage();
  displayItems();
}

function editTodo(index) {
  const newTask = prompt("Edit your task", todoList[index].item);
  if (newTask !== null && newTask.trim() !== "") {
    todoList[index].item = newTask.trim();
    saveToLocalStorage();
    displayItems();
  }
}

// initial render
displayItems();



  