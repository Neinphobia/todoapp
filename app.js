const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Array to store sample data
let todos = [
  { id: 1, task: 'Buy groceries' },
  { id: 2, task: 'Walk the dog' },
];

// GET /todos - Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// GET /todos/:id - Get a specific todo by id
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === id);

  if (!todo) {
    res.status(404).json({ error: 'Todo not found' });
  } else {
    res.json(todo);
  }
});

// POST /todos - Create a new todo
app.post('/todos', (req, res) => {
  const { task } = req.body;

  if (!task) {
    res.status(400).json({ error: 'Task is required' });
  } else {
    const newTodo = { id: todos.length + 1, task };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  }
});

// PUT /todos/:id - Update a todo
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { task } = req.body;
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex === -1) {
    res.status(404).json({ error: 'Todo not found' });
  } else if (!task) {
    res.status(400).json({ error: 'Task is required' });
  } else {
    todos[todoIndex].task = task;
    res.json(todos[todoIndex]);
  }
});

// DELETE /todos/:id - Delete a todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex === -1) {
    res.status(404).json({ error: 'Todo not found' });
  } else {
    const deletedTodo = todos.splice(todoIndex, 1)[0];
    res.json(deletedTodo);
  }
});

// Start the server only if not in a testing environment
if (!module.parent) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;
