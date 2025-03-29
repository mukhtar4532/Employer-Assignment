import { useState } from "react";
import axios from "../axios/axios.js";
import { useTheme } from "../context/ThemeContext"; // Import theme context

export const EditUser = ({ user, onClose, onUpdate, page }) => {
  const { theme } = useTheme(); // Get theme from context
  let [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData = { ...formData, id: user.id };

    try {
      const response = await axios.put(`/users/${user.id}`, formData);
      const updatedUser = response.data;

      // Update local storage
      const storedUsers =
        JSON.parse(localStorage.getItem(`users_page_${page}`)) || [];
      const updatedUsers = storedUsers.map((u) =>
        u.id === user.id ? updatedUser : u
      );

      localStorage.setItem(`users_page_${page}`, JSON.stringify(updatedUsers));

      // Update UI
      onUpdate(updatedUser);
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray bg-opacity-20 backdrop-blur-md z-50 transition-opacity duration-300">
      {/* Modal Container */}
      <div
        className={`relative w-full max-w-md p-6 rounded-lg shadow-xl transition-all duration-300 ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-4">Edit User</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="first_name"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="last_name"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
          <input
            type="email"
            name="email"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              className="w-1/3 p-3 text-center rounded-lg bg-gray-500 hover:bg-gray-600 text-white transition-all"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/3 p-3 text-center rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-all"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
