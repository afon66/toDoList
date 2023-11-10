

const tasksList = document.querySelector('#tasksList')
const taskInput = document.querySelector('#taskInput')
const form = document.querySelector('#form')
const taskTitle = document.querySelector('.task-title')
const emptyList = document.querySelector('#emptyList')

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach((task) => renderTask(task))
}

form.addEventListener('submit', addTask)
tasksList.addEventListener('click', deleteTask)



function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `
            <li id="emptyList" class="list-group-item empty-list">
                <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
                <div class="empty-list__title">Список дел пуст</div>
            </li>`
        tasksList.insertAdjacentHTML('afterbegin',emptyListHTML)
    } 
    
}


function addTask(e) {
    e.preventDefault();

    const newTask = {
        id: Date.now(),
        text: taskInput.value,
        done: false
    }

    tasks.push(newTask)

    renderTask(newTask)
    
    taskInput.value = '';
    checkEmptyList()
    saveLocalStorage()
}


function deleteTask(e) {
    const li = e.target.closest('li')
    const id = li.id

    if (e.target.dataset.action === 'delete') {
        e.target.closest('li').remove()

        const tasksIndex = tasks.findIndex((task) => task.id == id)

        tasks.splice(tasksIndex, 1)
    }

    if (e.target.dataset.action == 'done') {
        e.target.closest('li').querySelector('span').classList.toggle('task-title--done')

        const index = tasks.find((task) => task.id == +id);
        index.done = !index.done
        console.log(index)

    } 
    checkEmptyList()
    saveLocalStorage()
}

function saveLocalStorage() {
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

function renderTask(task) {
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title'

    const tagHTML = `
    <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
        <span class="${cssClass}">${task.text}</span>
        <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-action">
                <img src="./img/tick.svg" alt="Done" width="18" height="18">
            </button>
            <button type="button" data-action="delete" class="btn-action">
                <img src="./img/cross.svg" alt="Done" width="18" height="18">
            </button>
        </div>
    </li>`

    tasksList.insertAdjacentHTML('beforeend', tagHTML)
}