const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  content: {
    type: String,
    // required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Course = mongoose.model("course", CourseSchema);

