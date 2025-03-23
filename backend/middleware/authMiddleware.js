import pkg from "jsonwebtoken"; // Import the entire jsonwebtoken package as `pkg`
const { verify } = pkg; // Destructure the `verify` function from the package

const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId; // Add user info to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;
