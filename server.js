const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for tasks
let tasks = [
  { id: 1, description: 'Learn HTML' },
  { id: 2, description: 'Learn CSS' },
  { id: 3, description: 'Learn JavaScript' }
];
let nextId = 4;

// ----- API ROUTES -----

// GET /tasks - return all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks - add a new task
app.post('/tasks', (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ error: 'Description is required' });
  }
  const newTask = { id: nextId++, description };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// DELETE /tasks/:id - delete a task by id
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks.splice(index, 1);
  res.status(204).send(); // No content
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});