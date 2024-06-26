const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const courseRouter = require("./controllers/courses");

const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const config = require("./utils/config");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI).then(() => {
  logger.info("connected to MongoDB");
});

app.use(cors({ origin: "*", methods: "GET,HEAD,PUT,PATCH,POST,DELETE" }));
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/courses", courseRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
