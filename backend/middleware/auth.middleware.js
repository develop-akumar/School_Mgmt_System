const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  const authHeader = req.header("Authorization");
  console.log("authHeader = ", authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      error: "Access denied, token missing",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user(decoded);
    next();
  } catch (error) {
    console.log("JWT verification error = ", error);
    return res.status(400).json({
        error : "Invalid token" 
    })
  }
}

module.exports = authenticateJWT;
