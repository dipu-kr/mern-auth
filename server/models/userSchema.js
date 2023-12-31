const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keysecret = "jsdhsjdghgwjhdjgdghhdvbzvbcvcghc";

//---------- create user schema-------
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
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

//----- password hashing-------
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

// --------token generate---------
userSchema.methods.generateAuthtoken = async function () {
  try {
    let token23 = jwt.sign({ _id: this._id }, keysecret, {
      expiresIn: "1d",
    });
    this.tokens = this.tokens.concat({ token: token23 });
    await this.save();
    return token23;
  } catch (error) {
    res.status(422).json(error);
  }
};

// -------------create model--------------
const userdb = new mongoose.model("users", userSchema);

module.exports = userdb;
