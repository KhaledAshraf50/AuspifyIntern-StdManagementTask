import { useEffect, useState } from "react";
import AddStudent from "./AddStudent";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await fetch("https://localhost:7268/api/student");
      const data = await response.json();
      console.log(data);
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleStudentAdded = () => {
    fetchStudents();
    setIsFormOpen(false);
    setEditingStudent(null);
  };
  const handleEditClick = (student) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  const handleAddNewClick = () => {
    setEditingStudent(null);
    setIsFormOpen(!isFormOpen);
  };
  const handleDeleteStudent = async (studentId) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }
    try {
      const response = await fetch(
        `https://localhost:7268/api/student/${studentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        console.log("Student deleted successfully");
        fetchStudents();
      } else {
        console.error("Error deleting student");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="m-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Students</h2>
        <button
          onClick={handleAddNewClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          {isFormOpen && editingStudent ? "Close Form" : "+ Add Student"}
        </button>
      </div>

      {isFormOpen && (
        <AddStudent
          onStudentAdded={handleStudentAdded}
          onClose={() => {
            setIsFormOpen(false);
            setEditingStudent(null);
          }}
          studentToEdit={editingStudent}
        />
      )}

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full min-w-full divide-y divide-gray-200 bg-white text-sm text-left text-gray-700">
          <thead className="bg-gray-50 uppercase text-xs font-semibold text-gray-500 tracking-wider">
            <tr>
              <th scope="col" className="px-6 py-3.5">
                Id
              </th>
              <th scope="col" className="px-6 py-3.5">
                Name
              </th>
              <th scope="col" className="px-6 py-3.5">
                Email
              </th>
              <th scope="col" className="px-6 py-3.5">
                Department
              </th>
              <th scope="col" className="px-6 py-3.5">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 font-medium">
            {students.map((student) => (
              <tr
                key={student.id || student.Id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {student.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.department?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="d-flex">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm mr-2"
                      onClick={() => handleEditClick(student)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
