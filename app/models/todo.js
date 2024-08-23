import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.models.Todos || mongoose.model("Todos", TodoSchema);
export default Todo;
