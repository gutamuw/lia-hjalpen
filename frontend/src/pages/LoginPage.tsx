import React, { useState } from "react";
import { loginUser } from "../services/apiService";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginUser(email, password); // Logga in användaren
      navigate("/homepage"); // Navigera till Homepage efter inloggning
    } catch (err) {
      setError("Inloggning misslyckades. Kontrollera dina uppgifter.");
    }
  };

  return (
    <div className="wrapper">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Har du inget konto? <a href="/register">Registrera dig här</a>
      </p>
    </div>
  );
}

export default LoginPage;
