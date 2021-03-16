const express = require("express");
const router = express.Router();
const Course = require("../../models/Course");
const auth = require("../../middleware/auth");
const authStudent = require("../../middleware/authStudent");

//@route POST api/courses
//@desc Register a course
//@access Private
router.post("/", auth, async (req, res) => {
  const course = new Course({
    name: req.body.name,
    content: req.body.content,
    description: req.body.description,
  });
  try {
    const newCourse = await course.save();
    res.json(newCourse);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route GET api/courses
//@desc Get all courses
//@access Private

router.get("/", authStudent, async (req, res) => {
  try {
    const course = await Course.find().sort({ date: -1 });
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route PUT api/courses/:id
//@desc Update a course
//@access Private
router.put("/:id", auth, async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);
    if (course) {
      const courseUpdate = {
        name: req.body.name,
        content: req.body.content,
        description: req.body.description,
      };

      course = await Course.findOneAndUpdate(
        req.params.id,
        { $set: courseUpdate },
        { new: true }
      );
      return res.json(course);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route GET api/courses/course/:id
//@desc Get post by id
//@access Private

router.get("/course/:id", authStudent, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    res.json(course);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Course not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route GET api/courses/:name
// @desc Get course by name
// @access Private

router.get("/:name", authStudent, async (req, res) => {
  console.log(req.params.name);
  try {
    const course = await Course.findOne({ name: req.params.name });
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    res.json(course);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Course not found" });
    }
    res.status(500).send("Server error");
  }
});

//@route DELETE api/course/:ID
//@desc Delete a  post
//@access Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ msg: "Courses not found" });
    }

    await course.remove();
    res.json({ msg: "Course removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Courses not found" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
