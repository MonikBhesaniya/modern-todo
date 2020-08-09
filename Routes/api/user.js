const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../models/User");

//@Route   POST api/user
//@desc    Register user
//@access  Public
router.post(
  "/",
  [
    check("name", "Name is Required").notEmpty(),
    check("email", "Email is Required").notEmpty(),
    check(
      "password",
      "Please enter a password with 8 or more character"
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //check if already exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email is already registered with us" }] });
      }

      // fetching avatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      //create a new user
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      //save user in database
      await user.save();

      //creating jwt
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
