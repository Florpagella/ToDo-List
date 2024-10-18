// Info Date
const dateNumber = document.getElementById('dateNumber');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');
const dateText = document.getElementById('dateText');

const taskContainer = document.getElementById('taskContainer');


const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString('es', {day: 'numeric'});
    dateText.textContent = date.toLocaleString('es', {weekday: 'long'});
    dateMonth.textContent = date.toLocaleString('es', {month: 'short'});
    dateYear.textContent = date.toLocaleString('es', {year: 'numeric'});
}

//local Storage

const saveTasks = () => {
    const tasks = [];
    taskContainer.childNodes.forEach(el => {
        tasks.push({
            text: el.firstChild.textContent,
            done: el.classList.contains('done')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskData => {
        const task = document.createElement('div');
        task.classList.add('task');
        if (taskData.done) {
            task.classList.add('done');
        }
        task.addEventListener('click', changeTaskState);
        task.textContent = taskData.text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Borrar';
        deleteButton.addEventListener('click', deleteTask);
        task.appendChild(deleteButton);

        taskContainer.appendChild(task);
    });
};

const addNewTask = event => {
    event.preventDefault();
    const {value} = event.target.taskText;
    if(!value) return;
    const task = document.createElement('div');
    task.classList.add('task', 'newTask');
    task.addEventListener('click', changeTaskState)
    task.textContent = value;

    // delete task

    const deleteTaskBtn = document.createElement('button');
    deleteTaskBtn.classList.add('deleteBtn');
    deleteTaskBtn.textContent = 'Borrar';
    deleteTaskBtn.addEventListener('click', deleteTask);
    task.appendChild(deleteTaskBtn);


    taskContainer.prepend(task);
    event.target.reset();
// save tasks
    saveTasks();

};

const changeTaskState = event => {
    event.target.classList.toggle('done');
};

// delete task

const deleteTask = event => {
    event.stopPropagation();
    const task = event.target.parentElement;
    taskContainer.removeChild(task);
    //save tasks
    saveTasks();
};

const order = () => {
    const done = [];
    const toDo = [];

taskContainer.childNodes.forEach(el => {
    el.classList.contains('done') ? done.push(el) : toDo.push(el);
})

return [...toDo, ...done];

}

const renderTask = () => {
    order().forEach(el => taskContainer.appendChild(el));
}


setDate();
loadTasks();