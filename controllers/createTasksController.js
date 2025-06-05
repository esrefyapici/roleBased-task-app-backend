import Task from "../models/Task.js";

export const createTasksController = async (req, res) => {
  try {
    // task ile ilgili bilgileri client den aldık
    const { title, description, assignedTo } = req.body;
    // task ı ilgili kişiye atayarak db ye kaydettik
    const newTask = new Task({
      title,
      description,
      assignedTo,
      assignedBy: req.user.userId,
    });
    await newTask.save();
    res.status(201).json({ message: "Task created successfully", newTask });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
