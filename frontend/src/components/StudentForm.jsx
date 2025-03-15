import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/students', { name, rollNo });
      console.log(response.data);
      alert('Student added successfully!');
    } catch (error) {
      console.error(error);
      alert('Error adding student!');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Student Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="rollNo" className="form-label">Roll Number</label>
          <input type="text" className="form-control" id="rollNo" value={rollNo} onChange={(e) => setRollNo(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Student</button>
      </form>
    </div>
  );
};

export default StudentForm;
