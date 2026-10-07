import { useState } from 'react';
import axios from 'axios';
import '../styles/StudentForm.css';

const StudentForm = ({ onSuccess, editingStudent }) => {
  const [formData, setFormData] = useState(
    editingStudent || {
      name: '',
      email: '',
      phone: '',
      rollNumber: '',
      class: '',
      address: '',
      dateOfBirth: '',
    }
  );

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (editingStudent && editingStudent._id) {
        await axios.put(`http://localhost:5000/api/students/${editingStudent._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/students', formData);
      }
      setFormData({
        name: '',
        email: '',
        phone: '',
        rollNumber: '',
        class: '',
        address: '',
        dateOfBirth: '',
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-form-container">
      <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter student name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter email address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter 10-digit phone number"
            pattern="[0-9]{10}"
          />
        </div>

        <div className="form-group">
          <label htmlFor="rollNumber">Roll Number *</label>
          <input
            type="text"
            id="rollNumber"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            required
            placeholder="Enter roll number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="class">Class *</label>
          <input
            type="text"
            id="class"
            name="class"
            value={formData.class}
            onChange={handleChange}
            required
            placeholder="Enter class (e.g., 10-A)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth *</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Saving...' : editingStudent ? 'Update Student' : 'Add Student'}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
