const database = require("../database/database.js");
const express = require("express");
const router = express.Router();
const topic = "authentication";

router.get("/", async (req, res) => {
  try {
    const response = await database.findAll(topic);
    res.json(response);
  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
});

router.get("/:myId([0-9]+)", async (req, res) => {
  const id = parseInt(req.params.myId);
  try {
    const response = await database.findById(topic, id);
    res.status(200).json(response);
  } catch (error) {
    if (error.msg == `Item not found in database with id: ${id}`) {
      res.status(404).json(error);
    } else {
      res.status(500).json(error);
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const response = await database.authenticate(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
