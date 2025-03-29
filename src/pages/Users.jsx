import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios/axios.js";
import { EditUser } from "./EditUser.jsx";
import { useTheme } from "../context/ThemeContext";

export const Users = () => {
  const { theme } = useTheme();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState(null); // Stores selected user for editing

  const handleUpdate = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );

    // Update localStorage
    localStorage.setItem(
      `users_page_${page}`,
      JSON.stringify(
        users.map((user) =>
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        )
      )
    );

    setEditUser(null); // Close the modal
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem(`users_page_${page}`, JSON.stringify(updatedUsers));
  };

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem(`users_page_${page}`));

    if (storedUsers && storedUsers.length > 0) {
      setUsers(storedUsers);
    } else {
      axios
        .get(`/users?page=${page}`)
        .then((res) => {
          const fetchedUsers = Array.isArray(res.data.data)
            ? res.data.data
            : [res.data.data];
          setUsers(fetchedUsers);
          localStorage.setItem(
            `users_page_${page}`,
            JSON.stringify(fetchedUsers)
          );
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setUsers([]);
        });
    }
  }, [page]);

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 
      ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }
    `}
    >
      <div
        className="relative z-10 w-full max-w-4xl p-6 rounded-lg shadow-xl backdrop-blur-lg 
        bg-opacity-90 bg-white dark:bg-gray-800
      "
      >
        <h1 className="text-2xl font-semibold text-center mb-4">
          User Management
        </h1>

        {/* Search Bar */}
        <input
          type="text"
          className="w-full p-3 rounded-lg border-2 
            dark:bg-gray-700 dark:border-gray-600 dark:text-white
            bg-gray-200 border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search users..."
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* User List */}
        <div className="mt-4">
          {users.length > 0 ? (
            users
              .filter((u) =>
                u.first_name.toLowerCase().includes(search.toLowerCase())
              )
              .map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-white mb-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.first_name}
                      className="w-14 h-14 rounded-full border-2 dark:border-gray-600 border-gray-300"
                    />
                    <div>
                      <p className="font-semibold text-lg">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg mr-2 transition"
                      onClick={() => setEditUser(user)} // FIXED: Now correctly sets user for editing
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-center text-gray-500">No users found.</p>
          )}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit User Modal */}
      {editUser && (
        <EditUser
          user={editUser}
          onClose={() => setEditUser(null)}
          onUpdate={handleUpdate}
          page={page}
        />
      )}
    </div>
  );
};
