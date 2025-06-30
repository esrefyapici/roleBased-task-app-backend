import Task from "../models/Task.js";
import User from "../models/User.js";

export const getEmployeeTasksController = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { companyCode } = req.user;

    const employee = await User.findOne({
      _id: employeeId,
      companyCode,
      role: "employee",
    });

    if (!employee) {
      return res.status(404).json({
        error: "Employee not found or does not belong to your company",
      });
    }

    const tasks = await Task.find({ assignedTo: employeeId });

    res.json({ tasks });
  } catch (error) {
    console.error("Get Employee Tasks Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
