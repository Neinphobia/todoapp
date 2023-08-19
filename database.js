const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const url =
      "mongodb+srv://ccfurkanz:SwzPk85NGvmGOrw3@todo-try.xvyjmxj.mongodb.net/myTodos?retryWrites=true&w=majority";
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    //try catch
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = { connectDatabase };
