const express = require('express');
const Student = require('../models/Student');
const router = express.Router();

// Create a student
router.post('/', async (req, res) => {
  const { name, rollNo } = req.body;

  try {
    const student = new Student({ name, rollNo });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
