import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

export const loginController = async (req, res) => {
  try {
    // isteği atan client den değerleri al
    const { email, password } = req.body;
    // kullanıcı kayıtlı mı db den kontrol et
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    // kullanıcı kayıtlı ise şifresi doğru mu kontrol et
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    // kullanıcı için token üret
    const token = jwt.sign(
      { userId: user._id, role: user.role, companyCode: user.companyCode },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );
    // xss ve csrf için cookie parser ile token set edildi
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 8,
    });
    // client e json döndürüldü
    res.json({
      message: "Login successful",
      role: user.role,
      companyCode: user.companyCode,
      name: user.fullName,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
