
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [students, setStudents] = useState([])
  const [name, setName] = useState('')
  const [course, setCourse] = useState('')
  const [message, setMessage] = useState('')

  const API_URL = 'http://localhost:8080/api/students'

  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Failed to fetch students')
      const data = await response.json()
      setStudents(data)
      setMessage('')
    } catch {
      setMessage('Backend connect nahi hua. Check karo Spring Boot chal raha hai.')
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const addStudent = async (event) => {
    event.preventDefault()

    if (!name.trim() || !course.trim()) {
      setMessage('Name aur course dono bharo.')
      return
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), course: course.trim() }),
      })

      if (!response.ok) throw new Error('Failed to add student')

      setName('')
      setCourse('')
      setMessage('Student added successfully!')
      await fetchStudents()
    } catch {
      setMessage('Student add nahi hua. Backend check karo.')
    }
  }

  return (
    <div className="container">
      <h1>Student Management System</h1>
      <p className="subtitle">Manage student records</p>

      <form onSubmit={addStudent} className="student-form">
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(event) => setCourse(event.target.value)}
        />
        <button type="submit">Add Student</button>
      </form>

      {message && <p className="message">{message}</p>}

      <h2>Student List</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Course</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={`${student.id}-${index}`}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.course}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App
