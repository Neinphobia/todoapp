const express = require("express");
// const app = require('../app')
const {
  getTodos,
  getDetail,
  postTodo,
  getCustomDetail,
  deleteTodo,
  updateTodo,
} = require("./todosController");
const errorRouter = require("../utils/errorRouter");
const errorHandler = require("../errorHandler");
const todosRouter = express.Router();

// GET /todos - Get all todos
//get all todos
todosRouter.get("/", errorRouter(getTodos));

// GET /todos/:id - Get a specific todo by id

todosRouter.get("/:id", errorRouter(getDetail));

//for multiple custom id finding.
todosRouter.get("/custom/:id", errorRouter(getCustomDetail));

// POST /todos - Create a new todo
todosRouter.post("/", errorRouter(postTodo));

todosRouter.put("/:id", updateTodo);

// DELETE /todos/:id - Delete a todo
todosRouter.delete("/:id", deleteTodo);
//router cleared!
todosRouter.use(errorHandler);
module.exports = todosRouter;
