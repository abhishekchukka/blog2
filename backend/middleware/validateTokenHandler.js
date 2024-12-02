const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "User is not authorized" });
        return;
      }
      console.log(decoded);

      req.user = decoded;
      next();
    });
  } else {
    res
      .status(401)
      .json({ message: "Authorization header is missing or malformed" });
  }
});

module.exports = validateToken;
