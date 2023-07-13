const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log("Error while generating token");
    console.error(err);
  }
};
userSchema.pre("save", async function (next) {
  //if pasword is change only than change the hashing/bcrypt
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next(); //used to tell that after having the password it will run ahead
});

const hostPerson = mongoose.model("Users", userSchema);
module.exports = hostPerson;
