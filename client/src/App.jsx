import { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './App.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [editingStudent, setEditingStudent] = useState(null);

  const handleFormSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
    setEditingStudent(null);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Student Management System</h1>
      </header>
      <main className="app-main">
        <StudentForm onSuccess={handleFormSuccess} editingStudent={editingStudent} />
        <StudentList refreshTrigger={refreshTrigger} onEdit={handleEdit} />
      </main>
    </div>
  );
}

export default App;
