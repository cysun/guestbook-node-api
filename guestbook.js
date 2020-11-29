const express = require("express");
const cors = require("cors");

var idSeed = 100;
const entries = [
  {
    id: 1,
    name: "John",
    message: "Hello!",
  },
  {
    id: 2,
    name: "Tom",
    message: "Nice site.",
  },
];

const app = express();
app.use(cors());
app.use(express.json());

// Get Entries
app.get("/", (req, res) => {
  console.log("== Get Entries ==");
  console.log(entries);
  res.json(entries);
});

// Get Entry
app.get("/:id", (req, res) => {
  const entry = entries.find((e) => e.id == req.params.id);
  console.log("== Get Entry ==");
  console.log(entry);
  return entry ? res.json(entry) : res.status(404).end();
});

// Add Entry
app.post("/", (req, res) => {
  console.log(req.body);
  if (!req.body.name || !req.body.message) return res.status(400).end();

  const entry = {
    id: idSeed++,
    name: req.body.name,
    message: req.body.message,
  };
  entries.push(entry);

  console.log("== Add Entry ==");
  console.log(entries);
  res.json(entry);
});

// Edit Entry
app.patch("/:id", (req, res) => {
  const entry = entries.find((e) => e.id == req.params.id);
  if (!entry) return res.status(404).end();

  if (req.body.name) entry.name = req.body.name;
  if (req.body.message) entry.message = req.body.message;

  console.log("== Edit Entry ==");
  console.log(entries);
  res.status(200).end();
});

// Delete Entry
app.delete("/:id", (req, res) => {
  const index = entries.findIndex((e) => e.id == req.params.id);
  if (index < 0) return res.status(404).end();

  entries.splice(index, 1);

  console.log("== Delete Entry ==");
  console.log(entries);
  res.status(200).end();
});

// On error, return JSON instead of an error page
// by the default error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 400);
  res.json({
    name: err.name,
    message: err.message,
  });
});

const port = parseInt(process.env.PORT || "8080");
app.listen(port, () => console.log(`Listening on port ${port}`));
