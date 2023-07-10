const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/new", (req, res) => {
  let appstate = JSON.stringify(req.body, null, 2) + "\n";
  const random = Math.random().toString(36).substring(2);
  if (appstate) {
    fs.writeFile(`appstates/${random}.json`, appstate, (err) => {
      if (err) {
        res.status(400).send({ code: 400, message: "error" });
      } else {
        res.status(200).send({ code: 200, message: "success" });
      }
    });
  } else {
    res.status(400).send({ code: 400, message: "error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is listening on port ${port}`));
