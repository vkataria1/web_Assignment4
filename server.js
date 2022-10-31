/*********************************************************************************
 * WEB322 – Assignment 04
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
 * of this assignment has been copied manually or electronically from any other source
 * (including 3rd party web sites) or distributed to other students. *
 * ******************************************************************************** 
 * Name: Vishal Kataria
 * Student ID: 123094211
 * Date: Oct 31, 2022
 * ********************************************************************************
 * Online (Cyclic) Link: 
 * ********************************************************************************/

let express = require("express");
let path = require("path");
let officeData = require("./modules/officeData.js");

let HTTP_PORT = process.env.PORT || 8080;

let app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/parttimer", (req, res) => {
  officeData
    .getPartTimers()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: "no results" });
    });
});

app.get("/employee/:num", (req, res) => {
  officeData
    .getEmployeeByNum(req.params.num)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: "no results" });
    });
});

app.get("/audio", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/audio.html"));
});

app.get("/video", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/video.html"));
});

app.get("/table", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/table.html"));
});

app.get("/list", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/list.html"));
});

app.get("/storefront", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/storefront.html"));
});

app.get("/*", (req, res) => {
  res.send("404 - Page Not Found");
});

officeData.initialize().then(() => {
  app.listen(HTTP_PORT, () => {
    console.log("server listening on: " + HTTP_PORT);
  });
});
