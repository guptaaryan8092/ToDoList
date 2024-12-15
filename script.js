document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todo-input');
  const addTaskButton = document.getElementById('add-task-btn');
  const todoList = document.getElementById('todo-list');
  const dueDateInput = document.getElementById('due-date-input');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Render all tasks on page load
  tasks.forEach(task => renderTask(task));

  // Add new task
  addTaskButton.addEventListener('click', () => {
      const taskText = todoInput.value.trim();
      const dueDate = dueDateInput.value;
      if (taskText === "") {
          alert("Task cannot be empty");
          return;
      }

      const newTask = {
          id: Date.now(),
          text: taskText,
          dueDate: dueDate,
          completed: false
      };

      tasks.push(newTask);
      saveTasks();
      renderTask(newTask);
      todoInput.value = "";
      dueDateInput.value = "";
  });

  // Render a task
  function renderTask(task) {
      const li = document.createElement('li');
      li.setAttribute("data-id", task.id);
      if (task.completed) li.classList.add("completed");

      li.innerHTML = `
          <span>${task.text}</span>
          <span class="due-date">${task.dueDate}</span>
          <button>Delete</button>
      `;

      li.addEventListener('click', (e) => {
          if (e.target.tagName === 'BUTTON') return;
          task.completed = !task.completed;
          li.classList.toggle('completed');
          saveTasks();
      });

      li.querySelector('button').addEventListener('click', (e) => {
          e.stopPropagation();
          tasks = tasks.filter(t => t.id !== task.id);
          li.remove();
          saveTasks();
      });

      todoList.appendChild(li);
  }

  // Save tasks to localStorage
  function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
