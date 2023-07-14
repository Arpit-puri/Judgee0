const Job = require("../models/codeModel");
var compiler = require("compilex");
var options = { stats: true }; //prints stats on console
compiler.init(options);
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

module.exports.register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const userCheck = await User.findOne({ username });

    if (userCheck) {
      return res.json({ msg: "username already used", status: false });
    }
    console.log(userCheck);
    //check out db schema for password
    if (password && email && username) {
      const user = new User({
        //check out register.js file schema use all the attrebutes in it
        username,
        email,
        password,
      });
      await user.save();
      res.json({ status: true, user });
    } else {
      res.json({ msg: "Error to register", status: false });
    }
  } catch (e) {
    res.json({ msg: "Error to register", status: false });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({ msg: "Fill all details", status: false });
    }
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.json({ msg: "Invalid details", status: false });
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.json({ msg: "Invalid details", status: false });
    }
    const token = await user.generateAuthToken();
    if (!token) {
      return res.json({ msg: "Credentials dont match", status: false });
    }
    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });
    return res.json({
      status: true,
      msg: "Login Successful...!",
      username: user.username,
      token,
    });
  } catch (ex) {
    res.json({ msg: "Can't login", status: false });
  }
};

exports.logOut = async (req, res) => {
  try {
    compiler.flush(function () {
      console.log("All temporary files flushed !");
    });
    compiler.flushSync();
    return res.json({ msg: "successfully log out", status: true });
  } catch (err) {
    console.log("logout fails");
    res.json({ msg: "Can't logout", status: false });
  }
};

module.exports.run = async (req, res) => {
  try {
    const { language, code, radio, input } = req.body;
    console.log(language);
    console.log(radio);

    if (language === "Java") {
      if (radio) {
        var envData = { OS: "windows" };
        compiler.compileJavaWithInput(
          envData,
          code,
          input,
          async function (data) {
            if (data.error) {
              res.send(data.error);
            } else {
              const job = await new Job({
                language,
                output: data.output,
              }).save();
              res.send(data.output);
            }
          }
        );
      } else if (!radio) {
        var envData = { OS: "windows" };
        compiler.compileJava(envData, code, async function (data) {
          if (data.error) {
            res.send(data.error);
          } else {
            const job = await new Job({ language, output: data.output }).save();
            res.send(data.output);
          }
        });
      }
    }

    if (language === "cpp" || language === "C") {
      if (radio) {
        var envData = { OS: "windows", cmd: "g++" };
        compiler.compileCPPWithInput(
          envData,
          code,
          input,
          async function (data) {
            if (data.error) {
              res.send(data.error);
            } else {
              const job = await new Job({
                language,
                output: data.output,
              }).save();
              res.send(data.output);
            }
          }
        );
      } else if (!radio) {
        var envData = { OS: "windows", cmd: "g++" };
        compiler.compileCPP(envData, code, async function (data) {
          if (data.error) {
            res.send(data.error);
          } else {
            const job = await new Job({ language, output: data.output }).save();
            res.send(data.output);
          }
        });
      }
    }

    if (language === "Py") {
      if (radio) {
        var envData = { OS: "windows" };
        compiler.compilePythonWithInput(
          envData,
          code,
          input,
          async function (data) {
            if (data.error) {
              res.send(data.error);
            } else {
              const job = await new Job({
                language,
                output: data.output,
              }).save();
              res.send(data.output);
            }
          }
        );
      } else if (!radio) {
        var envData = { OS: "windows" };
        compiler.compilePython(envData, code, async function (data) {
          if (data.error) {
            res.send(data.error);
          } else {
            await new Job({ language, output: data.output }).save();
            res.send(data.output);
          }
        });
      }
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports.fullStat = () => {
  compiler.fullStat(function (data) {
    res.send(data);
  });
};
