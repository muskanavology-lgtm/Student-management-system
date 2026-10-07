import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/StudentList.css';

const StudentList = ({ refreshTrigger, onEdit }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch students');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:5000/api/students/${id}`);
        fetchStudents();
      } catch (err) {
        setError('Failed to delete student');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="loading">Loading students...</div>;

  return (
    <div className="student-list-container">
      <h2>Students List</h2>
      {error && <div className="error-message">{error}</div>}
      {students.length === 0 ? (
        <p className="no-students">No students found. Add one to get started!</p>
      ) : (
        <div className="students-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Roll Number</th>
                <th>Class</th>
                <th>DOB</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.rollNumber}</td>
                  <td>{student.class}</td>
                  <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                  <td className="actions">
                    <button className="edit-btn" onClick={() => onEdit(student)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(student._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentList;
