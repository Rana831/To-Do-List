const addTaskBtn = document.getElementById("AddTask");
const taskInput = document.getElementById("taskInput")
const tasksLoaded = document.getElementById("tasksLoaded")
initLoadTasks()
addTaskBtn.addEventListener("click", function(event){
    event.preventDefault();
    const taskText = taskInput.value;
    if(taskText){
        loadTasksForElement(taskText);
        saveTasks(taskText);
    }
})
function saveTasks(taskText){
const tasks = getTasksFromLocalStorage(); 
tasks.push(taskText)
localStorage.setItem("tasks", JSON.stringify(tasks))
 
}
function loadTasksForElement(taskText) {
    const li =   document.createElement("li")
    li.innerText = taskText;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function() {
        deleteTask(taskText);
    });
  li.appendChild(deleteBtn);
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", function() {
        editTask(taskText);
    });
  li.appendChild(editBtn);
    tasksLoaded.appendChild(li);  
}
function initLoadTasks(){
    const tasks  = getTasksFromLocalStorage();
     
    tasks.forEach(task => loadTasksForElement(task))
}                  
function getTasksFromLocalStorage(){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [] 
    return tasks;
} 
function deleteTask(taskText) {
    const tasks = getTasksFromLocalStorage();
    const task = tasks.indexOf(taskText);
    if (task !==-1) {
        tasks.splice(index,1);
        localStorage.setItem("task", JSON.stringify(tasks));
        tasksLoaded.innerHTML = "";
        initLoadTasks();
    }
  }
  function editTask(taskText) {
    const tasks = getTasksFromLocalStorage();
    const task = tasks.indexOf(taskText);
    if (index !== -1) {
        const newTaskText = prompt("Enter new task text:", taskText);
        if (newTaskText) {
            tasks[task] = newTaskText;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            tasksLoaded.innerHTML = "";
            initLoadTasks();
        }
    }
}