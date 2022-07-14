const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: false }));

app.listen(3000);

app.get("/", function (req, res) {
  res.send(
    "<form action='/user-store' method='POST'><label>Your Name</label><input type='text' name='username'/><button type='submit'>Submit</button></form>"
  );
});

app.post("/user-store", function (req, res) {
  const userName = req.body.username;
  const filePath = path.join(__dirname, "Data", "user.json");
  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);
  existingUsers.push(userName);
  fs.writeFileSync(filePath, JSON.stringify(existingUsers));
  res.send("<h1> Saved Perfectly </h1>");
});

app.get("/users", function (req, res) {
  const filePath = path.join(__dirname, "Data", "user.json");
  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);
  let userList = "<ul>";
  for (const user of existingUsers) {
    userList += `<li>${user}</li>`;
  }
  userList += "</ul>";
  res.send(userList);
});
