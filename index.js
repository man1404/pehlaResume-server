const express = require("express");
const cors = require("cors");
const pdf = require("html-pdf");
const pdfSample = require("./pdfsample/index");
const newSchema = require("./userModel");
const path = require("path");
const { connectDB } = require("./mongo");
connectDB();

const app = express();

const port = 4000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/create-pdf/", (req, res) => {
  // const {templateid} = req.params;
  pdf.create(pdfSample(req.body), {}).toFile("Resume.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
      console.log(err);
    }
    res.send(Promise.resolve());
    console.log("Success");
  });
});

app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/Resume.pdf`);
});

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.use("/", require("./userRoutes"));

app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port=${port}`);
});
