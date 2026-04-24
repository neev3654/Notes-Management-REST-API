// First We have create middleware .
function auth(req, res, next) {

  // Step 1 - Extract token from headers
  const token = req.headers.authorization;

  // Step 2 - Check if token exists
  if (!token) {
    return res.status(400).json({ msg: "Access denied. Token Required" });
  }

  // Step 3 - Validate the token
  if (token !== "Neev") {
    return res.status(401).json({ msg: "Invalid Token" });
  }

  // Step 4 - Token is valid, proceed
  console.log("Successfully Verified Token");

  next();
}

module.exports = auth;