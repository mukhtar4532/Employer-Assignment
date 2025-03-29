import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios/axios.js";
import { useTheme } from "../context/ThemeContext";

export const Login = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/users");
    } catch (err) {
      setError("Invalid email or password!");
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center h-screen px-6 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100"
      }`}
    >
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-72 h-72 bg-white opacity-30 blur-3xl rounded-full top-20 left-10 animate-bounce-slow"></div>
        <div className="absolute w-60 h-60 bg-white opacity-40 blur-3xl rounded-full bottom-10 right-20 animate-bounce-reverse"></div>
        <div className="absolute w-64 h-64 bg-white opacity-10 blur-3xl rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce-fast"></div>
      </div>

      {/* Login Functionality */}
      <div className="z-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
