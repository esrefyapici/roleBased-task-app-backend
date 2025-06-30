import Task from "../models/Task.js";

export const patchTasksController = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.assignedTo.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ error: "Access denied: You can only update your own tasks." });
    }

    task.status = status;
    await task.save();

    res.json({ message: "Task status updated", task });
  } catch (error) {
    console.error("Patch Task Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
