const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const authStudent = require("../../middleware/authStudent");
const Student = require("../../models/Student");
const Course = require("../../models/Course");

router.post(
    "/comm/course/:id",
    [authStudent, [check("text", "Text is required").not().isEmpty()]],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const student = await Student.findById(req.student.id).select(
          "-password"
        );
        const course = await Course.findById(req.params.id);
        const newPost = {
          text: req.body.text,
          name: student.name,
          student: req.student.id,
        };
  
        course.comment.unshift(newPost);
        await course.save();
        res.json(course.comment);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  );

  module.exports = router;