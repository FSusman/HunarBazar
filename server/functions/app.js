const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const mongoose = require("mongoose");

const userRouter = require("../controllers/users");
const loginRouter = require("../controllers/login");
const courseRouter = require("../controllers/courses");

const middleware = require("../utils/middleware");
const logger = require("../utils/logger");
const config = require("../utils/config");

const serverless = require('serverless-http')

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI).then(() => {
  logger.info("connected to MongoDB");
});

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

router.use("/api/users", userRouter);
router.use("/api/login", loginRouter);
router.use("/api/courses", courseRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

router.get("/", (req, res) => res.send("haha"));

app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);
