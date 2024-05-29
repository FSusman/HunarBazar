const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  title: String,
  description: String,
  students: Number,
  timeRequired: String,
  courseThumbnail: String,
  courseCurriculum: String,
  instructor: String,
  content: [{ type: Object }],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Course = mongoose.model("Course", userSchema);

module.exports = Course;
