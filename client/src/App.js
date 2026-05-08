import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [course, setCourse] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const API_URL = "https://student-management-system-kjac.onrender.com/students";

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get(API_URL);
    setStudents(res.data);
  };

  // Add or Update
  const addOrUpdateStudent = async () => {
    if (!name || !rollNo || !course) return;

    const studentData = {
      name,
      rollNo,
      course,
    };

    if (editId) {
      await axios.put(`${API_URL}/${editId}`, studentData);
      setEditId(null);
    } else {
      await axios.post(API_URL, studentData);
    }

    fetchStudents();

    setName("");
    setRollNo("");
    setCourse("");
  };

  // Edit
  const editStudent = (student) => {
    setName(student.name);
    setRollNo(student.rollNo);
    setCourse(student.course);
    setEditId(student._id);
  };

  // Delete
  const deleteStudent = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchStudents();
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(search.toLowerCase()) ||
    student.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Student Management System</h1>

      <input
        className="search-box"
        placeholder="Search student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="form">
        <input
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Roll Number"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
        />

        <input
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <button onClick={addOrUpdateStudent}>
          {editId ? "Update Student" : "Add Student"}
        </button>
      </div>

      <div className="student-list">
        {filteredStudents.map((student) => (
          <div className="student-card" key={student._id}>
            <h3>{student.name}</h3>
            <p>Roll No: {student.rollNo}</p>
            <p>Course: {student.course}</p>

            <button
              className="edit-btn"
              onClick={() => editStudent(student)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteStudent(student._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;