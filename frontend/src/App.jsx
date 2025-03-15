import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import StudentForm from './components/StudentForm';
import AttendanceForm from './components/AttendanceForm';
import AttendanceReport from './components/AttendanceReport';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1 className="text-center mt-5">Welcome to the Student Attendance System</h1>} />
        <Route path="/students" element={<StudentForm />} />
        <Route path="/attendance" element={<AttendanceForm />} />
        <Route path="/attendance-report" element={<AttendanceReport />} />
      </Routes>
    </Router>
  );
}

export default App;
