import Task from "../models/Task.js";
import User from "../models/User.js";

export const employeeDashboardController = async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;

    const user = await User.findById(userId).select(
      "fullName email companyCode"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const tasks = await Task.find({ assignedTo: userId });

    res.json({
      message: "Employee dashboard data",
      user,
      tasks,
    });
  } catch (error) {
    console.error("Employee Dashboard Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
