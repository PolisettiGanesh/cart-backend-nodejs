const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // 1. Get authorization header
    const authHeader = req.headers.authorization;

    // 2. Check header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization token required",
      });
    }

    // 3. Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // 4. Verify token
    const decodedUser = jwt.verify(token, process.env.JWT_KEY);

    // 5. Attach decoded user to request object
    req.user = decodedUser;

    // 6. Move to next middleware / controller
    next();
  } catch (error) {
    // 7. Token invalid or expired
    return res.status(400).json({
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;
