const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("GET category");
});

router.post("/create", (req, res) => {});

router.put("/update", (req, res) => {});

router.delete("/delete", (req, res) => {});

module.exports = router;
