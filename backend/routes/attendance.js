const express = require('express');
const Attendance = require('../models/Attendance');
const router = express.Router();

// POST attendance
router.post('/', async (req, res) => {
  const { studentId, statusArray, month, year } = req.body;

  // Check if the attendance for this student in the given month and year already exists
  const existingAttendance = await Attendance.findOne({ studentId, month, year });
  
  if (existingAttendance) {
    // If attendance for the student for this month/year exists, update it
    existingAttendance.statusArray = statusArray;
    await existingAttendance.save();
    return res.json(existingAttendance);  // Send the updated attendance back
  }

  // If no existing attendance, create a new record
  const newAttendance = new Attendance({
    studentId,
    statusArray,
    month,
    year,
  });

  try {
    const savedAttendance = await newAttendance.save();
    res.json(savedAttendance);  // Send the saved attendance back
  } catch (err) {
    res.status(400).send(err);  // Send error response if saving fails
  }
});

// Get all attendance records
router.get('/', async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find().populate('studentId', 'name');
    res.json(attendanceRecords);
  } catch (err) {
    res.status(500).send('Error fetching attendance records');
  }
});

module.exports = router;
