import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceReport = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/attendance'); // Fetch all attendance data
        setAttendanceData(response.data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, []);

  const calculateStats = (attendance) => {
    const totalDays = attendance.statusArray.length;
    const totalPresent = attendance.statusArray.filter(status => status === 'Present').length;
    const totalAbsent = attendance.statusArray.filter(status => status === 'Absent').length;
    return { totalDays, totalPresent, totalAbsent };
  };

  return (
    <div className="container mt-5">
      <h2>Attendance Report</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Total Days</th>
            <th>Total Present</th>
            <th>Total Absent</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((attendance) => {
            const studentName = attendance.studentId.name;
            const { totalDays, totalPresent, totalAbsent } = calculateStats(attendance);

            return (
              <tr key={attendance._id}>
                <td>{studentName}</td>
                <td>{totalDays}</td>
                <td>{totalPresent}</td>
                <td>{totalAbsent}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceReport;
