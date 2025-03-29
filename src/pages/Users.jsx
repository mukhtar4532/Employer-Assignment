import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios/axios.js";
import { EditUser } from "./EditUser.jsx";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState(null);
  const navigate = useNavigate();

  // const fetchUsers = async () => {
  //   try {
  //     const res = await axios.get(`/users?page=${page}`);
  //     console.log("Fetched Users List:", res.data.data);
  //     setUsers(res.data.data);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  const handleUpdate = (updatedUser) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = storedUsers.map((user) =>
      user.id === updatedUser.id ? { ...user, ...updatedUser } : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers)); // Save to local storage
    setUsers(updatedUsers); // Update UI
  };

  const handleDelete = (id) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = storedUsers.filter((user) => user.id !== id);

    localStorage.setItem("users", JSON.stringify(updatedUsers)); // Save to local storage
    setUsers(updatedUsers); // Update UI
  };

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));

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
          localStorage.setItem("users", JSON.stringify(fetchedUsers)); // Store in local storage
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setUsers([]);
        });
    }
  }, [page]);

  return (
    <div className="p-4">
      <input
        type="text"
        className="border p-2 mb-4 w-full"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {users.length > 0 ? (
        users
          .filter((u) =>
            u.first_name.toLowerCase().includes(search.toLowerCase())
          )
          .map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center p-2 border-b"
            >
              <p>
                {user.first_name} {user.last_name}
              </p>
              <div>
                <button
                  className="bg-yellow-500 text-white px-2 py-1 mr-2"
                  onClick={() => setEditUser(user)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
      ) : (
        <p>No users found.</p>
      )}

      <div className="mt-4">
        <button
          className="bg-gray-300 px-3 py-1 mr-2"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <button
          className="bg-gray-300 px-3 py-1"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      {editUser && (
        <EditUser
          user={editUser}
          onClose={() => setEditUser(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};
