import Task from "../models/Task.js";

export const getEmployeeTasksController = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const tasks = await Task.find({
      assignedTo: employeeId,
    });
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
