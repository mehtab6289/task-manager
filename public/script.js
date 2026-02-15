// API base URL (same server, so relative URL works)
const API_URL = '/tasks';

// DOM elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Fetch and display all tasks on page load
window.addEventListener('load', fetchTasks);

// Add task when button is clicked
addBtn.addEventListener('click', addTask);

// Allow pressing Enter to add task
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// ----- Functions -----

async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

function renderTasks(tasks) {
    taskList.innerHTML = ''; // Clear list
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.description;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

async function addTask() {
    const description = taskInput.value.trim();
    if (!description) {
        alert('Please enter a task description');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description })
        });

        if (response.ok) {
            taskInput.value = '';          // clear input
            fetchTasks();                   // refresh list
        } else {
            alert('Failed to add task');
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

async function deleteTask(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchTasks(); // refresh list after deletion
        } else {
            alert('Failed to delete task');
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}