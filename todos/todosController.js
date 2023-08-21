//const TodosModel = require("../models/todoModels");
const todosService = require("./todosService");

const getTodos = async (req, res) => {
  const result = await todosService.getTodos();
  return res.json(result);
};

const getDetail = async (req, res, next) => {
  const result = await todosService.getDetail(req.params.id);
  return res.json(result);
};

//
const postTodo = async (req, res) => {
  const { task, id, purpose, commit, important } = req.body;

  const result = await todosService.postTodo(
    task,
    id,
    purpose,
    commit,
    important
  );

  return res.json(result);
};
const getCustomDetail = async (req, res) => {
  const result = await todosService.getCustomDetail(req.params.id);

  return res.json(result);
};

const deleteTodo = async (req, res) => {
  const id = req.params.id;
  const result = await todosService.deleteTodo(id);
  const deletedResult = {
    silinen: result,
    silindi: true,
  };
  return res.json(deletedResult);
};
const updateTodo = async (req, res) => {
  const id = req.params.id;
  const { task } = req.body;
  // console.log(id, task);
  const result = await todosService.updateTodo(id, task);
  return res.json(result);
};
module.exports = {
  getTodos,
  getDetail,
  getCustomDetail,
  postTodo,
  updateTodo,
  deleteTodo,
};
