import { useEffect, useState } from "react";
import AddDepts from "./AddDepts";

export default function Depts() {
  const [departments, setDepartments] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
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

  const handleDepartmentAdded = () => {
    fetchDepartments();
    setIsFormOpen(false);
  };
  return (
    <div className="m-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Departments</h2>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          {isFormOpen ? "Close Form" : "+ Add Department"}
        </button>
      </div>

      {isFormOpen && (
        <AddDepts
          onDepartmentAdded={handleDepartmentAdded}
          onClose={() => setIsFormOpen(false)}
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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 font-medium">
            {departments.map((dept) => (
              <tr
                key={dept.id || dept.Id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {dept.id || dept.Id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {dept.name || dept.Name}
                </td>
              </tr>
            ))}
            {departments.length === 0 && (
              <tr>
                <td colSpan="2" className="text-center py-6 text-gray-500">
                  No departments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
