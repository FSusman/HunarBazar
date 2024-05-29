const courseRouter = require("express").Router();
const Course = require("../models/course");

courseRouter.get("/", async (request, response) => {
  try {
    const courses = await Course.find({});
    response.json(courses);
  } catch (error) {
    response.status(500).json({ error: "Failed to retrieve courses" });
  }
});

courseRouter.get("/:id", async (request, response) => {
  try {
    const course = await Course.findById(request.params.id);
    if (course) {
      response.json(course);
    } else {
      response.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    response.status(400).json({ error: "Invalid course ID" });
  }
});


courseRouter.post("/", async (request, response) => {
  const {
    title,
    description,
    students,
    timeRequired,
    courseThumbnail,
    courseCurriculum,
    content,
    instructor,
  } = request.body;

  if (!title) {
    return response.status(400).json({ error: "Title is required" });
  }

  const course = new Course({
    title,
    description,
    students,
    timeRequired,
    courseThumbnail,
    courseCurriculum,
    content,
    instructor,
  });

  try {
    const savedCourse = await course.save();
    response.status(201).json(savedCourse);
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: "Failed to create course" });
  }
});



module.exports = courseRouter;
