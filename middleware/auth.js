const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Auth Error" });

  const split_token = token.split(" ");
  const bearer_token = split_token[1];
  if (!bearer_token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(bearer_token, "M8IT_SECRET_STRONG_PASS_FIND");
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ status: "false", message: "Invalid Token" });
  }
};
