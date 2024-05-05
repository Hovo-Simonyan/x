const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Server started"));

app.use(express.json());
app.use(express.static("build"));
app.use((req, res, next) => {
  console.log(req.url);
  if (!req.url.includes("/api") || req.url === "/") {
    console.log("file send");
    res.sendFile(path.join(__dirname + "/build/index.html"));
  } else {
    console.log("next");
    next();
  }
});
const items = [
  {
    name: "Laptop",
    price: 500,
  },
  {
    name: "Desktop",
    price: 700,
  },
];
app.get("/", (req, res) => {
  res.send("ok");
});
app.get("/api/items", (req, res) => {
  res.send(items);
});
app.post("/api/items", (req, res) => {
  console.log(req.body);
  items.push(req.body);
  res.send(items);
});
