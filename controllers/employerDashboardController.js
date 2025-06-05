import User from "../models/User.js";

export const employerDashboardController = async (req, res) => {
  try {
    const { companyCode } = req.user;
    const employees = await User.find(
      { role: "employee", companyCode },
      { fullName: 1, email: 1 }
    );
    res.json({
      message: "Employer dashboard data",
      companyCode,
      employees,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
