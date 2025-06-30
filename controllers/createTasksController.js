import Task from "../models/Task.js";

export const createTasksController = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    if (!title || !assignedTo) {
      return res
        .status(400)
        .json({ error: "Title and assignedTo are required." });
    }

    const assignedBy = req.user.userId || req.user.id;

    const newTask = new Task({
      title,
      description,
      assignedTo,
      assignedBy,
    });

    await newTask.save();

    res.status(201).json({ message: "Task created successfully", newTask });
  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
