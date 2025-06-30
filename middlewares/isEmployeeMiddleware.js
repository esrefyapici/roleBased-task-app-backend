export const isEmployeeMiddleware = (req, res, next) => {
  const { role } = req.user;
  if (role !== "employee") {
    return res
      .status(403)
      .json({ error: "Access denied: Only employees allowed." });
  }
  next();
};
