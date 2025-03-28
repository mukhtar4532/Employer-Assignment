import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios/axios.js";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all users
    axios
      .get(`/users?page=${page}`)
      .then((res) => {
        console.log(res.data);
        console.log(res.data.data);
        setUsers(
          Array.isArray(res.data.data) ? res.data.data : [res.data.data]
        );
        console.log(users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setUsers([]);
      });
  }, [page]);

  const handleDelete = (id) => {
    console.log(id);
    axios.delete(`/users/${id}`);
    console.log(users);

    setUsers(users.filter((user) => user.id !== id));
    console.log(users);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        className="border p-2 mb-4 w-full"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {Array.isArray(users) && users.length > 0 ? (
        users
          .filter((u) =>
            u.first_name.toLowerCase().includes(search.toLowerCase())
          )
          .map((user, index) => (
            <div
              key={user.id || index}
              className="flex justify-between items-center p-2 border-b"
            >
              <p>
                {user.first_name} {user.last_name}
              </p>
              <button
                className="bg-red-500 text-white px-2 py-1"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </div>
          ))
      ) : (
        <p>No users found.</p>
      )}
      <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
        Prev
      </button>
      <button onClick={() => setPage((p) => p + 1)}>Next</button>
    </div>
  );
};
