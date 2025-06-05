// token i cookie den sildik artık kullanıcının tokeni olmadığı için authMiddleware ile korunan routelara erişemeyecek
export const logoutController = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Logged out successfully" });
};
