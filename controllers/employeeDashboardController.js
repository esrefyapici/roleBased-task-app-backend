import Task from "../models/Task.js";
import User from "../models/User.js";

export const employeeDashboardController = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId).select(
      "fullName email companyCode"
    );
    const tasks = await Task.find({ assignedTo: userId });
    res.json({
      message: "Employee dashboard data",
      user,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
