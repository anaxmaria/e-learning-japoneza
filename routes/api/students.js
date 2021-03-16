const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
const Student = require("../../models/Student");
const config = require("config");

//@route POST api/students
//@desc Register student
//@access Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include an valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //See if the user exists
      let student = await Student.findOne({ email });

      if (student) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Student already exists" }] });
      }
      student = new Student({
        name,
        email,
        password
      });
      //Encrypt password

      const salt = await bcrypt.genSalt(10);

      student.password = await bcrypt.hash(password, salt);
      await student.save();
      //Return jsonwebtoken
      const payload = {
        student: {
          id: student.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
