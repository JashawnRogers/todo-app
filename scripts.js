const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoUL = document.getElementById('todo-list');

let todoList = getTodos();
console.log(todoList);
updateTodoList();

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
})

const addTodo = () => {
    const todoText = todoInput.value.trim();

    if (todoText.length > 0) {
        const todoObj = {
            text: todoText,
            completed: false,
        }

        todoList.push(todoObj);
        updateTodoList();
        saveTodos();
        todoInput.value = '';
    }
}

function updateTodoList() {
    todoUL.innerHTML = '';

    todoList.forEach((todo, todoIndex) => {
        todoItem = createNewListItem(todo, todoIndex);
        todoUL.append(todoItem);
    })
}

function createNewListItem(todo,todoIndex) {
    const todoID = 'todo-'+ todoIndex;
    const todoLI = document.createElement('li');
    const todoText = todo.text;
    todoLI.className = 'todo';
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
    const deleteBtn = todoLI.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        deleteTodo(todoIndex);
    })

    const checkbox = todoLI.querySelector('input');
    checkbox.addEventListener('change', () => {
        todoList[todoIndex].completed = checkbox.checked;
        saveTodos();
    })

    checkbox.checked = todo.completed;
    return todoLI;
}

function deleteTodo(todoIndex) {
    todoList = todoList.filter((_, i) => i !== todoIndex);
    saveTodos()
    updateTodoList();
}

function saveTodos() {
    const todosJSON = JSON.stringify(todoList);
    localStorage.setItem('todos', todosJSON);
}

function getTodos() {
    const todos = localStorage.getItem('todos') || '[]';
    return JSON.parse(todos);
}