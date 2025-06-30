export const isEmployerMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "employer") {
    return res
      .status(403)
      .json({ error: "Access denied: Only employers allowed." });
  }
  next();
};
