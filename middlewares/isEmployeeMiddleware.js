export const isEmployeeMiddleware = (req, res, next) => {
  const { role } = req.user;
  if (role !== "employee") {
    return res.status(401).json({ error: "Unauthorized." });
  }
  next();
};
