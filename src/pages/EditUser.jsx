import { useState } from "react";
import axios from "../axios/axios.js";

// import { updateUser } from "../services/api";

export const EditUser = ({ user, onClose, onUpdate }) => {
  let [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });
  const userId = user.id;
  //   console.log(userId);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Before Update:", formData);
    formData = {
      ...formData,
      id: userId,
    };

    try {
      const response = await axios.put(`/users/${user.id}`, formData);
      const updatedUser = response.data;
      console.log("Updated User Data:", updatedUser);

      // Update localStorage
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = storedUsers.map((u) =>
        u.id === user.id ? updatedUser : u
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Update UI with latest data
      onUpdate(updatedUser);
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-md w-96">
        <h2 className="text-xl mb-3">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            className="border p-2 w-full mb-2"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
          />
          <input
            type="text"
            name="last_name"
            className="border p-2 w-full mb-2"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <input
            type="email"
            name="email"
            className="border p-2 w-full mb-2"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 px-3 py-2 mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-3 py-2">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
