const express = require("express");
const router = express.Router();
const Course = require("../../models/Course");
const MyCourse = require("../../models/MyCourses");
const Student = require("../../models/Student");
const authStudent = require("../../middleware/authStudent");

//@route POST api/mycourses
//@desc Get course by name author
//@access Private
router.post("/", authStudent, async (req, res) => {
  const student = await Student.findById(req.student.id).select("-password");
  const myCourse = new MyCourse({
    studentName: student.name,
    courseId: req.body.id,
    courseName: req.body.courseName,
    description: req.body.description,
  });
  try {
    myCourses = await MyCourse.find({studentName: student.name, courseId: req.body.id})
    if(myCourses.length == 0){
      const newCourse = await myCourse.save();
      res.json(newCourse);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route GET api/mycourses/course/:nameAuth
//@desc Get course by student name
//@access Private

router.get("/:nameAuth", authStudent, async (req, res) => {
  console.log("aaaa");
  try {
    const courses = await Course.find();
    console.log(courses);
    const coursesIds = [];
    courses.forEach(element => {
      coursesIds.push(element.id);
    })
    console.log(coursesIds);
    const myCourses = await MyCourse.find({ studentName: req.params.nameAuth });
    const myCoursesFinal = [];
    myCourses.forEach(element => {
      console.log(String(element.courseId));
      if(coursesIds.includes(element.courseId)){
        console.log("asd")
        myCoursesFinal.push(element);
      }
    })
    if (!myCoursesFinal) {
      return res.status(404).json({ msg: "Course not found" });
    }
    res.json(myCoursesFinal);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Course not found" });
    }
    res.status(500).send("Server error");
    console.log("aa");
  }
});

// router.delete("/:nameAuth", auth, async (req, res) => {
//   try {
//     const course = await MyCourse.find({ studentName: req.params.nameAuth });

//     if (!course) {
//       return res.status(404).json({ msg: "Courses not found" });
//     }

//     await course.remove();
//     res.json({ msg: "Course removed" });
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Courses not found" });
//     }
//     res.status(500).send("Server error");
//   }
// });

module.exports = router;
