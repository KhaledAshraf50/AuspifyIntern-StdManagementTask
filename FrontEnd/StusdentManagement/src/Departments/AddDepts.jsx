import { useState } from "react";

export default function AddDepts({ onDepartmentAdded, onClose }) {
  const [formData, setFormData] = useState({
    Name: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.Name.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("https://localhost:7268/api/department", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Handle successful submission
        console.log("Department added successfully");
        // Reset form data
        setFormData({ Name: "" });
        onDepartmentAdded();
      } else {
        // Handle error
        console.error("Error adding department");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-4 shadow-inner flex flex-col sm:flex-row gap-3 items-start sm:items-center"
    >
      <div className="flex-1 w-full">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Department Name
        </label>
        <input
          type="text"
          name="Name"
          id="name"
          value={formData.Name}
          placeholder="Enter department name"
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>
      <div className="flex gap-2 w-full sm:w-auto sm:self-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-md transition-colors disabled:opacity-50 flex-1 sm:flex-none"
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-md transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
