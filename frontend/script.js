document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    const apiUrl = 'http://localhost:5000/todos';

    async function fetchTodos() {
        try {
            const response = await fetch(apiUrl);
            const todos = await response.json();
            renderTodos(todos);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    }

    function renderTodos(todos) {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.title;
            li.dataset.id = todo._id;

            if (todo.completed) {
                li.classList.add('completed');
            }

            const actions = document.createElement('div');
            actions.className = 'actions';

            const completeBtn = document.createElement('button');
            completeBtn.textContent = todo.completed ? 'Undo' : 'Complete';
            completeBtn.addEventListener('click', () => toggleComplete(todo));

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => deleteTodo(todo._id));

            actions.appendChild(completeBtn);
            actions.appendChild(deleteBtn);
            li.appendChild(actions);
            todoList.appendChild(li);
        });
    }

    async function addTodo(event) {
        event.preventDefault();
        const title = todoInput.value;
        if (!title) return;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title })
            });
            if (response.ok) {
                todoInput.value = '';
                fetchTodos();
            }
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    }

    async function toggleComplete(todo) {
        try {
            const response = await fetch(`${apiUrl}/${todo._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !todo.completed })
            });
            if (response.ok) {
                fetchTodos();
            }
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    }

    async function deleteTodo(id) {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchTodos();
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }

    todoForm.addEventListener('submit', addTodo);
    fetchTodos();
}); 