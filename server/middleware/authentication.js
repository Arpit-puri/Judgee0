const jwt = require("jsonwebtoken");
const user = require("../models/userModel");
const cookieParser = require("cookie-parser");

exports.authenticateUser = async (req, res, next) => {
  try {
    res.cookie('token', '', { expires: new Date(0) });
    const token = req.cookies.token;
    console.log(token);
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    const userExist = await user.findOne({
      _id: verify._id,
      "tokens.token": token,
    });

    if (!userExist) {
      throw new Error("User Not Found");
    }

    req.token = token;
    req.rootUser = userExist;
    req.userId = userExist._id;

    next();
  } catch (err) {
    console.log("Auth fail");
    console.log(err);
  }
};
