const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate.js");

// -------user registration---------
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email && !password) {
    res.status(422).json({ error: "All field are required" });
  }

  try {
    const preuser = await userdb.findOne({ email: email });
    if (preuser) {
      res.status(422).json({ error: "This Email is Already Exist!" });
    } else {
      const finaluser = new userdb({ username, email, password });
      // save data in database
      const storeData = await finaluser.save();
      res.status(201).json({ status: 201, storeData });
    }
  } catch (error) {
    res.status(422).json(error);
    console.log("catch block error");
  }
});

// ----------user login-----------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    res.status(422).json({ error: "All field are required" });
  }

  try {
    const userValid = await userdb.findOne({ email: email });
    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);

      if (!isMatch) {
        res.status(422).json({ error: "Invalid details" });
      } else {
        // token generate inside userSchema file
        const token = await userValid.generateAuthtoken();

        // cookie genrate
        res.cookie("usercookie", token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true,
        });

        const result = {
          userValid,
          token,
        };
        res.status(201).json({ status: 201, result });
      }
    }
  } catch (error) {
    res.status(422).json(error);
    console.log(error);
  }
});

// --------------user validation----------------
// router.use(authenticate);

router.get("/validuser", authenticate, async (req, res) => {
  try {
    const validUserOne = await userdb.findOne({ _id: req.userId });
    res.status(201).json({status:201,data:validUserOne})
  } catch (error) {
    res.status(401).json({status:401,error})
  }
});

module.exports = router;
