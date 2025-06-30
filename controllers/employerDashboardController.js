import User from "../models/User.js";

export const employerDashboardController = async (req, res) => {
  try {
    const { companyCode, role } = req.user;

    if (role !== "employer") {
      return res.status(403).json({ error: "Access denied" });
    }

    const employees = await User.find(
      { role: "employee", companyCode },
      { _id: 1, fullName: 1, email: 1 }
    );

    res.json({
      message: "Employer dashboard data",
      companyCode,
      employees,
    });
  } catch (error) {
    console.error("Employer Dashboard Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
