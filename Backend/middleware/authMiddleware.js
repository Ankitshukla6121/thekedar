const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Check if cookies exist; then try to retrieve the accessToken from the cookies.
  const token = req.cookies ? req.cookies.refreshToken : null;



  // If no access token is found, return a 401 Unauthorized error.
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verify the token using the secret key.
  jwt.verify(token,  process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      // If token verification fails, return a 403 Forbidden error.
      return res.status(403).json({ message: "Invalid token" });
    }
    // If the token is valid, attach the user ID (decoded from the token) to the request object.
    req.userId = decoded.userId;
    next(); // Pass control to the next middleware or route handler.
  });
};

module.exports = authMiddleware;
