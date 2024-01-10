const database = require("../database/database.js");
const express = require("express");
const router = express.Router();
const topic = "points";

router.get("/", async (req, res) => {
  try {
    const response = await database.findAll(topic);
    res.json(response);
  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
});

router.get("/user/:myId([0-9]+)", async (req, res) => {
  const id = parseInt(req.params.myId);
  try {
    const response = await database.findPointsByUser(id);
    res.status(200).json(response);
  } catch (error) {
    if (error.msg == `Item not found in database with id: ${id}`) {
      res.status(404).json(error);
    } else {
      res.status(500).json(error);
    }
  }
});

router.get("/:exercise/:myId([0-9]+)", async (req, res) => {
    const id = parseInt(req.params.myId);
    const exerciseName = req.params.exercise;
    try {
      const response = await database.findPointsByExercise(id,exerciseName);
      res.status(200).json(response);
    } catch (error) {
      if (error.msg == `Item not found in database with id: ${id}`) {
        res.status(404).json(error);
      } else {
        res.status(500).json(error);
      }
    }
});

router.delete("/:myId([0-9]+)", async (req, res) => {
  const id = parseInt(req.params.myId);
  try {
    const response = await database.deleteById(topic, id);
    res.status(200).json(response);
  } catch (error) {
    if (error.msg == `Item not found in database with id: ${id}`) {
      res.status(404).json(error);
    } else {
      res.status(500).json(error);
    }
  }
});

router.post("/", async (req, res) => {
  try {
    const response = await database.save(topic, req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error.msg);
  }
});

module.exports = router;
