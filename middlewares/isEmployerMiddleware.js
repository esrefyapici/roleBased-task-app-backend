export const isEmployerMiddleware = (req, res, next) => {
  const { role } = req.user;
  if (role !== "employer") {
    return res.status(401).json({ error: "Unauthorized." });
  }
  next();
};

