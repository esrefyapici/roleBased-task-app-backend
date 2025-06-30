import bcrypt from "bcrypt";
import crypto from "crypto";

import User from "../models/User.js";

export const registerController = async (req, res) => {
  try {
    const { fullName, email, password, role, companyCode } = req.body;

    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "employer") {
      const generatedCompanyCode = crypto.randomBytes(3).toString("hex");
      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
        role,
        companyCode: generatedCompanyCode,
      });
      await newUser.save();
      return res.json({
        message: "Employer registered",
        companyCode: generatedCompanyCode,
      });
    } else if (role === "employee") {
      const employer = await User.findOne({ role: "employer", companyCode });
      if (!employer) {
        return res.status(400).json({ error: "Invalid company code" });
      }
      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
        role,
        companyCode,
      });
      await newUser.save();
      return res.json({ message: "Employee registered" });
    } else {
      return res.status(400).json({ error: "Invalid role" });
    }
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
