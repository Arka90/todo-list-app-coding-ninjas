const input = document.querySelector('.add-task');
const list = document.querySelector('#list');

const noTask = document.querySelectorAll('#tasks-counter');
const noTaskRemain = document.querySelector('#tasks-remaining');

let tasks = [];

//Adding tasks
function addTask() {
  //Read the value of input and storing it in a variable text
  const text = input.value;

  //if the user enter blank text then this function will return immidiaely
  if (!text) return;

  //clearing the input field
  input.value = '';

  const task = {
    text: text,
    id: Date.now(),
    checked: false,
  };

  tasks.push(task);

  renderTask(tasks);
  noTask.forEach((el) => {
    el.innerHTML = tasks.length;
  });
}

// Marking the task as checked and unchecked
function markTaskAsComplete(taskId) {
  tasks.forEach((task) => {
    if (task.id == taskId) {
      task.checked = !task.checked;
      renderTask(tasks);
      taskCompleted();
      return;
    }
  });
}

//Removing a particular task using it's id
function removeTask(taskId) {
  const newTask = tasks.filter((el) => el.id != taskId);
  tasks = newTask;
  renderTask(tasks);
  noTask.forEach((el) => {
    el.innerHTML = tasks.length;
  });
  taskCompleted();
}

//rendering task list in the page
function renderTask(tasks) {
  list.innerHTML = '';

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.innerHTML = `<input
    type="checkbox"
    id="${task.id}"
    data-id="${task.id}"
    class="custom-checkbox"
    ${task.checked ? 'checked' : ''}
  />
  <label for="${task.id}">${task.text}</label>
  <i class="fa-sharp fa-solid fa-trash delete" id="${task.id}"></i>`;
    list.append(li);
  });
}

// tells out of how many tasks have been left and done
function taskCompleted() {
  let completed = 0;

  tasks.forEach((el) => {
    if (el.checked) {
      completed++;
    }
  });

  noTaskRemain.textContent = completed;
}

// Listing event for task submission
input.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') addTask();
  return;
});

// for delete and checking
window.addEventListener('click', (e) => {
  const target = e.target;

  if (target.classList.contains('delete')) {
    const taskId = target.id;
    removeTask(taskId);
  } else if (target.classList.contains('custom-checkbox')) {
    const taskId = target.id;
    markTaskAsComplete(taskId);
  }
});
