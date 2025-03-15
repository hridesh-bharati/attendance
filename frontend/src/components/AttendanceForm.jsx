import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const AttendanceForm = () => {
  const [students, setStudents] = useState([]);
  const [statusArray, setStatusArray] = useState([]); // Stores attendance for each student
  const [month, setMonth] = useState(new Date().getMonth()); // Current month (0-indexed)
  const [year, setYear] = useState(new Date().getFullYear()); // Current year

  // Fetch students when the component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students');
        setStudents(response.data);

        // Initialize the status array with "Absent" for each student (31 days)
        const initialStatus = response.data.map(() => Array(31).fill('Absent'));
        setStatusArray(initialStatus);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  // Get the number of days in the month
  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month + 1, 0);
    return date.getDate(); // Returns the number of days in the month
  };

  const daysInMonth = getDaysInMonth(month, year);

  // Get the first day of the month to build the calendar
  const getFirstDayOfMonth = (month, year) => {
    const date = new Date(year, month, 1);
    return date.getDay(); // First day of the month (0 = Sunday, 6 = Saturday)
  };

  const firstDay = getFirstDayOfMonth(month, year);

  // Update attendance status for a specific student on a specific day
  const handleStatusChange = (studentIndex, day, status) => {
    const updatedStatus = [...statusArray];
    updatedStatus[studentIndex][day - 1] = status; // Set status for the given student and day
    setStatusArray(updatedStatus);
  };

  // Build the calendar grid for the current month
  const buildCalendar = () => {
    const calendar = [];
    let currentDay = 1;

    const rows = Math.ceil((firstDay + daysInMonth) / 7); // Number of weeks in the month

    for (let row = 0; row < rows; row++) {
      const week = [];
      for (let col = 0; col < 7; col++) {
        if (row === 0 && col < firstDay) {
          week.push(null); // Empty cells before the start of the month
        } else if (currentDay <= daysInMonth) {
          week.push(currentDay);
          currentDay++;
        } else {
          week.push(null); // Empty cells after the last day of the month
        }
      }
      calendar.push(week);
    }

    return calendar;
  };

  const calendar = buildCalendar();

  // Handle form submission to save the attendance
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Submit attendance data for all students
      for (let i = 0; i < students.length; i++) {
        await axios.post('http://localhost:5000/api/attendance', {
          studentId: students[i]._id,
          statusArray: statusArray[i], // Attendance status for the student
          month,
          year,
        });
      }
      alert('Attendance saved successfully!');
    } catch (error) {
      console.error('Error saving attendance:', error);
      alert('Error saving attendance!');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Mark Attendance</h2>

      <form onSubmit={handleSubmit}>
        <div className="attendance-grid">
          {/* Displaying Day Names */}
          <div className="attendance-header">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div key={index} className="attendance-cell header">{day}</div>
            ))}
          </div>

          {/* Displaying each student's attendance */}
          {students.map((student, studentIndex) => (
            <div key={student._id} className="attendance-row">
              <div className="attendance-cell student-name">
                {student.name} - {student.rollNo}
              </div>

              {/* Calendar days */}
              {calendar.map((week, weekIndex) => (
                week.map((day, dayIndex) => (
                  <div key={dayIndex} className="attendance-cell">
                    {day ? (
                      <div className="attendance-day">
                        <div>{day}</div>
                        <div className="attendance-buttons">
                          <button
                            type="button"
                            className={`btn btn-sm ${statusArray[studentIndex][day - 1] === 'Present' ? 'btn-success' : 'btn-outline-success'}`}
                            onClick={() => handleStatusChange(studentIndex, day, 'Present')}
                          >
                            P
                          </button>
                          <button
                            type="button"
                            className={`btn btn-sm ${statusArray[studentIndex][day - 1] === 'Absent' ? 'btn-danger' : 'btn-outline-danger'}`}
                            onClick={() => handleStatusChange(studentIndex, day, 'Absent')}
                          >
                            A
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>-</div>
                    )}
                  </div>
                ))
              ))}
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-success btn-lg btn-block mt-3">
          Save Attendance
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;
