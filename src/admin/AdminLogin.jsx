import { useState } from "react";
import http from "../services/http";

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      const res = await http.post("/admin/login", { password });
      localStorage.setItem("adminToken", res.data.token);
      onLogin();
    } catch {
      setError("Invalid password");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>

        <input
          type="password"
          placeholder="Admin Password"
          className="input mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          onClick={login}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
