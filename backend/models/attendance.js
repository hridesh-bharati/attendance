const mongoose = require('mongoose');

// Define the schema for attendance
const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  statusArray: { type: [String], required: true }, // Array of attendance statuses for each day of the month
  month: { type: Number, required: true }, // Month (1-12)
  year: { type: Number, required: true }, // Year (e.g., 2023)
});

module.exports = mongoose.model('Attendance', attendanceSchema);
