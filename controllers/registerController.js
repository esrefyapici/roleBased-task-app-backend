import bcrypt from "bcrypt";
import crypto from "crypto";

import User from "../models/User.js";

export const registerController = async (req, res) => {
  try {
    // isteği atan client den değerleri al
    const { fullName, email, password, role, companyCode } = req.body;
    // bu email i kullanan başka kullanıcı var mı bak
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "Email already registered" });
    }
    // yeni kullanıcının şifresini hash le
    const hashedPassword = await bcrypt.hash(password, 10);
    // eğer kayıt olmaya çalışan kullanıcı işveren ise bir companyCode üret ve db ye kaydet
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
      res.json({
        message: "Employer registered",
        companyCode: generatedCompanyCode,
      });
    }
    // eğer kayıt olmaya çalışan kullanıcı işçi ise companyCode u kontrol et işveren var mı? varsa işçiyi db ye kaydet
    if (role === "employee") {
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
    }
    res.status(400).json({ error: "Invalid role" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
