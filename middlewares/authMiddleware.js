import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // cookie den token ı aldık
  const token = req.cookies.token;
  // token yoksa yetkili olmadığını response döndük
  if (!token) {
    return res.status(401).json({ error: "Unauthorized. No token provided." });
  }
  // token varsa(login ise) token e gömdüğümüz değerleri(id,role,companyCode) req.user a tanımladık next ile middleware den çıktık
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};
