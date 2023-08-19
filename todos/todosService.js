const TodosModel = require("../models/todoModels");
// const errorHandler = require("../errorHandler");

const getTodos = async () => {
  try {
    const result = await TodosModel.find();
    return result;
  } catch (error) {
    throw new Error("Veri çekilemedi!");
  }
};

const getDetail = async (id) => {
  const result = await TodosModel.findById(id);

  return result;
};

const getCustomDetail = async (customId, req) => {
  const result = await TodosModel.find({ id: customId });
  if (result.length === 0 || result == null) {
    //If the array is empty meaning: theres no such customid 😳
    throw new Error("custom id .... erroru");
  }
  return result;
};

const postTodo = async (task, id, purpose, commit, important) => {
  const newTodo = new TodosModel({
    task,
    id,
    purpose,
    commit,
    important,
  });
  const result = await newTodo.save();
  return result;
};

const updateTodo = async (id, task) => {
  // logging the data: console.log(id, task);
  const result = await TodosModel.findByIdAndUpdate(
    id,
    { task: task }, //field name required!
    { new: true }
  );

  if (!result) {
    throw new Error("Güncelleme işleminde hata meydana geldi.");
  }

  return result;
};

const deleteTodo = async (id) => {
  const result = await TodosModel.findByIdAndDelete(id);
  return result;
};
module.exports = {
  getTodos,
  getDetail,
  postTodo,
  updateTodo,
  getCustomDetail,
  deleteTodo,
};

//middleware error handler =>('sex');
//json web token research
