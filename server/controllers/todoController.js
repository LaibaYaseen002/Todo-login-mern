import Todo from "../models/Todo.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching todos" });
  }
};

export const createTodo = async (req, res) => {
  const { text } = req.body;
  try {
    const newTodo = new Todo({ text, userId: req.user });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ msg: "Error creating todo" });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  try {
    const updated = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user },
      { text, completed },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Error updating todo" });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findOneAndDelete({ _id: id, userId: req.user });
    res.json({ msg: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting todo" });
  }
};
