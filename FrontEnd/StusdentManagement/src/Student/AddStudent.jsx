import { useEffect, useState } from "react";

export default function AddStudent({
  onStudentAdded,
  onClose,
  studentToEdit = null,
}) {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Dept_Id: "",
  });
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        Name: studentToEdit.name || "",
        Email: studentToEdit.email || "",
        Dept_Id: studentToEdit.dept_Id || "",
      });
    }
  }, [studentToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: name === "Dept_Id" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isEdit = Boolean(studentToEdit);
    const url = isEdit
      ? `https://localhost:7268/api/student/${studentToEdit.id}`
      : "https://localhost:7268/api/student";

    const method = isEdit ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          isEdit ? "Failed to update student" : "Failed to add student",
        );
      }

      setFormData({ Name: "", Email: "", Dept_Id: "" });
      if (onStudentAdded) onStudentAdded();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch("https://localhost:7268/api/department");
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-4 shadow-inner flex flex-col gap-3"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name:
          </label>
          <input
            type="text"
            name="Name"
            id="name"
            value={formData.Name}
            placeholder="Name"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email:
          </label>
          <input
            type="email"
            name="Email"
            id="email"
            value={formData.Email}
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Department:
          </label>
          <select
            name="Dept_Id"
            id="department"
            value={formData.Dept_Id}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="" disabled>
              Select Department
            </option>
            {departments.map((dept) => (
              <option key={dept.id || dept.Id} value={dept.id || dept.Id}>
                {dept.name || dept.Name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-md transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors shadow-sm disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : studentToEdit
              ? "Update Student"
              : "Add Student"}
        </button>
      </div>
    </form>
  );
}
