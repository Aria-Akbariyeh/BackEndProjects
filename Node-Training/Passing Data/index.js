import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", )
});

app.post("/submit", (req, res) => {
  let countLetters = (req.body.fName + req.body.lName).length; 
  console.log(countLetters);
  res.render("index.ejs", { countLetters : countLetters});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
