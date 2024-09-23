const addTaskBtn = document.getElementById("submit");
const taskInput = document.getElementById("inputText");
const tasksLoaded = document.getElementById("list");

initLoadTasks()

addTaskBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const taskText = taskInput.value;
    if (taskText) {
        loadTasksForElement(taskText);
        saveTasks(taskText);
        taskInput.value = "";
    }
})

function saveTasks(taskText) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(taskText)
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function loadTasksForElement(taskText) {
    const li = document.createElement("li")
    li.innerText = taskText;
    const deleteBtn = document.createElement("deleteButton");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
        deleteTask(taskText);
    });
    li.appendChild(deleteBtn);
    const editBtn = document.createElement("editButton");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function () {
        editTask(taskText);
    });
    li.appendChild(editBtn);
    tasksLoaded.appendChild(li);
}

function initLoadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => loadTasksForElement(task))
}
function getTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []
    return tasks;
}
function deleteTask(taskText) {
    const tasks = getTasksFromLocalStorage();
    const task = tasks.indexOf(taskText);
    tasks.splice(task, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    tasksLoaded.innerHTML = "";
    initLoadTasks();

}
function editTask(taskText) {
    const tasks = getTasksFromLocalStorage();
    const task = tasks.indexOf(taskText);
    const editTaskText = prompt("Enter text for the ubdated task:", taskText);
    if (editTaskText) {
        tasks[task] = editTaskText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        tasksLoaded.innerHTML = "";
        initLoadTasks();
    }

}