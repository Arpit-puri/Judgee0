const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const router = require("./router/route");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

const port = process.env.PORT || 2000;

//Database connection
require("./db/conn");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.disable("x-powered-by");
app.use(morgan("tiny"));
app.use(cookieParser());

/** HTTP GET Request */
app.get("/", (req, res) => {
  res.status(201).json("Home GET Request");
});

app.use("/api", router);

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
