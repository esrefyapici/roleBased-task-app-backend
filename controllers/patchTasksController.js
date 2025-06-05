import Task from "../models/Task.js";

export const patchTasksController = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const task = await Task.findById(taskId);
    task.status = status;
    await task.save();
    res.json({ message: "Task status updated", task });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
