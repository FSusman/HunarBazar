const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("enrolledCourses");
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password, email } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    email,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    response.status(201).json({ user: savedUser });
  } catch (error) {
    if (
      error.name === "MongoServerError" &&
      error.message.includes("E11000 duplicate key error")
    ) {
      return response
        .status(400)
        .json({ error: "expected `username` or `email` to be unique" });
    } else {
      return response
        .status(500)
        .json({ error: "Internal server error occured" });
    }
  }
});

usersRouter.post("/enroll/:id", async (request, response) => {
  const { id } = request.params;
  const { userId } = request.body;

  try {
    const userToUpdate = await User.findById(userId);

    if (!userToUpdate) {
      return response.status(404).send({ error: "User not found" });
    }

    if (userToUpdate.enrolledCourses.includes(id)) {
      return response
        .status(200)
        .json({ message: "User is already enrolled in the course" });
    }

    userToUpdate.enrolledCourses = userToUpdate.enrolledCourses.concat(id);

    const updatedUser = await userToUpdate.save();

    response.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    response.status(400).send({ error: "An error occurred" });
  }
});

usersRouter.post("/:id", async (request, response) => {
  const { id } = request.params;
  const { extras } = request.body;

  try {
    const userToUpdate = await User.findById(id);

    if (!userToUpdate) {
      return response.status(404).send({ error: "User not found" });
    }

    userToUpdate.extras = extras;

    const updatedUser = await userToUpdate.save();

    response.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    response.status(400).send({ error: "An error occurred" });
  }
});

module.exports = usersRouter;
