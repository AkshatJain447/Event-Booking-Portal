import jwt from "jsonwebtoken";

const verify = (req, res, next) => {
  const { authToken } = req.cookies;

  if (!authToken) {
    return res.status(401).json({ message: "User not logged in" });
  }

  try {
    const decoded = jwt.verify(authToken, process.env.SECRET_KEY);
    req.user = decoded; // attach user info (id, role) to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default verify;
