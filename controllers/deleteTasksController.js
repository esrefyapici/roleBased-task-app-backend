import Task from "../models/Task.js";
import User from "../models/User.js";

export const deleteTasksController = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const employee = await User.findOne({
      _id: task.assignedTo,
      companyCode: req.user.companyCode,
    });
    if (!employee) {
      return res
        .status(403)
        .json({ error: "Access denied: Task does not belong to your company" });
    }

    await Task.findByIdAndDelete(taskId);

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete Task Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
