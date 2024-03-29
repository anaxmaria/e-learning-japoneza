const express = require("express");
const router = express.Router();
const authStudent = require("../../middleware/authStudent");
const Student = require("../../models/Student");
const Assignment = require("../../models/Assignment");

//@route POST api/assignment
//@desc Create one assignment
//@access Private
router.post("/", authStudent, async (req, res) => {
  try {
    //console.log(req.body);
    //console.log("abc");
    const student = await Student.findById(req.student.id).select("-password");
    const newAssignment = new Assignment({
      title: req.body.title,
      courseName: req.body.courseName,
      problemDescription: req.body.problemDescription
    });

    const assignment = await newAssignment.save();
    res.json(assignment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route GET api/assignments
//@desc Get all assignments
//@access Private

router.get("/", authStudent, async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Get assignment by course name
router.get("/assignment/:name", authStudent, async (req, res) => {
  console.log(req.params.name);
  try {
    const assignment = await Assignment.find({ courseName: req.params.name });
    if (!assignment) {
      return res.status(404).json({ msg: "Assignment not found" });
    }

    res.json(assignment);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Assignment not found" });
    }
    res.status(500).send("Server error");
  }
});

//@route GET api/courses/course/:id
//@desc Get post by id
//@access Private

router.get("/:id", authStudent, async (req, res) => {
  try {
    const course = await Assignment.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ msg: "Assignment not found" });
    }

    res.json(course);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Assignment not found" });
    }
    res.status(500).send("Server error");
  }
});

router.delete("/:id", authStudent, async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ msg: "Assignment not found" });
    }

    await assignment.remove();
    res.json({ msg: "Assignment removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Assignment not found" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
