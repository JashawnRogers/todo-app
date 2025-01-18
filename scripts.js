const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoUL = document.getElementById('todo-list');
const todaysDate = document.getElementById('date');

let todoList = getTodo();
updateTodoList();
getDate()

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
})

function addTodo() {
    const todoText = todoInput.value.trim();

    if (todoText.length > 0) {
        todoObj = {
            text: todoText,
            completed: false,
        }
        todoList.push(todoObj);
        updateTodoList()
        saveTodo();
        todoInput.value = '';
    }
}

function updateTodoList() {
    todoUL.innerHTML = '';
    todoList.forEach((todo, todoIndex) => {
        todoItem = createNewElement(todo, todoIndex);
        todoUL.append(todoItem);
    })
}

function createNewElement(todo, todoIndex) {
    const todoLI = document.createElement('li');
    const todoID = 'todo-'+ todoIndex;
    const todoText = todo.text;
    todoLI.classList = 'todo';
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoID}">
        <label for="${todoID}" class="custom-checkbox">
            <svg xmlns="http://www.w3.org/2000/svg" fill="transparent" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>
        </label>
        <label for="${todoID}" class="todo-text">
            ${todoText}
        </label>
        <button class="delete-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="var(--secondary-color)" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        </button>
        
    `
    const checkbox = todoLI.querySelector('input');
    checkbox.addEventListener('change', () => {
        todoList[todoIndex].completed = checkbox.checked;
        saveTodo();
    })

    const deleteBtn = todoLI.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        deleteTodo(todoIndex);
        
    })
    
    checkbox.checked = todo.completed;
    return todoLI;
}

function deleteTodo(todoIndex) {
    todoList = todoList.filter((_, i) => i !== todoIndex);
    saveTodo();
    updateTodoList();
}

function saveTodo() {
    const todoJSON = JSON.stringify(todoList);
    localStorage.setItem('todos', todoJSON);
}

function getTodo() {
    const todos = localStorage.getItem('todos') || '[]';
    return JSON.parse(todos);
}

function getDate() {
    const date = new Date();
    let month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    console.log(date.getDate());
    switch (month) {
        case 0:
            month = 'January';
        break;
        case 1:
            month ='February';
        break;
        case 2:
            month = 'March';
        break;
        case 3:
            month ='April';
        break;
        case 4:
            month = 'May';
        case 5:
            month = 'June'
        break;
        case 6:
            month = 'July'
        break;
        case 7:
            month = 'August';
        break;
        case 8:
            month = 'September';
        break;
        case 9:
            month = 'October';
        break;
        case 10:
            month = 'November';
        break;
        case 11:
            month = 'December';
        break;
        default:
            month = 'ERROR...'
    }

    todaysDate.innerText = `${month} ${day}, ${year}`;
}