import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
// import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import axios from "../axios/axios.js";

export const Login = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("/login", { email, password })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        console.log(res.data.token);

        setUser(true);
        navigate("/users");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl mb-4">Login</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md"
        >
          <input
            className="border p-2 w-full mb-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border p-2 w-full mb-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            className="bg-blue-500 text-white px-4 py-2 w-full"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};
