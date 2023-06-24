const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 3000;


mongoose.connect('mongodb+srv://ccfurkanz:SwzPk85NGvmGOrw3@todo-try.xvyjmxj.mongodb.net/myTodos?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });

// Create a Todo schema
const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  id : { type: Number, required:false},
  purpose: { type: String, required:false},
  commit: { type: String, required:false},
  important: {type: String, required:false},
},{
  versionKey:'__v',
});

// Create a Todo model
const Todo = mongoose.model('Todo', todoSchema);

// 
// Middleware to parse JSON requests
app.use(express.json());
app.use(cors()); // Enable CORS middleware



// GET /todos - Get all todos
app.get('/todos', (req, res) => {
  Todo.find()
    .then(todos => {
      res.json(todos);
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred' });
    });
});

// GET /todos/:id - Get a specific todo by id
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        res.status(404).json({ error: 'Todo not found' });
      } else {
        res.json(todo);
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred' });
    });
});

// POST /todos - Create a new todo
app.post('/todos', (req, res) => {
  const { task, id, purpose, commit, important } = req.body;

  if (!task) {
    res.status(400).json({ error: 'Task is required' });
  } else {
    const newTodo = new Todo({ task, id, purpose, commit, important });

    newTodo.save()
      .then(savedTodo => {
        res.status(201).json(savedTodo);
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred' });
      });
  }
});
app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const { task } = req.body;

  Todo.findByIdAndUpdate(id, { task }, { new: true })
    .then(updatedTodo => {
      if (!updatedTodo) {
        res.status(404).json({ error: 'Todo not found' });
      } else {
        //console.log(updatedTodo.__v);
        res.json(updatedTodo);
        
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred' });
    });
});

// DELETE /todos/:id - Delete a todo
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;

  Todo.findByIdAndDelete(id)
    .then(deletedTodo => {
      if (!deletedTodo) {
        res.status(404).json({ error: 'Todo not found' });
      } else {
        res.json(deletedTodo);
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred' });
    });
});

// Start the server only if not in a testing environment
if (!module.parent) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;
