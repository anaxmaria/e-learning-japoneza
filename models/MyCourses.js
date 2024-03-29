const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MyCoursesSchema = new Schema({
  courseId: {
    type: String,
  },
  studentName: {
    type: String,
  },
  courseName: {
    type: String,
  },
  description: {
    type: String,
  }
});
module.exports = MyCourses = mongoose.model("mycourses", MyCoursesSchema);
