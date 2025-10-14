import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const saveAccount = (email, password) => {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const exists = accounts.find(acc => acc.email === email);
    if (exists) {
      alert("⚠️ Esa cuenta ya existe");
      return false;
    }
    accounts.push({ email, password });
    localStorage.setItem("accounts", JSON.stringify(accounts));
    alert("✅ Cuenta creada con éxito");
    return true;
  };

  const login = (email, password) => {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const user = accounts.find(acc => acc.email === email && acc.password === password);
    if (user) {
      localStorage.setItem("session", JSON.stringify(user));
      alert("✅ Sesión iniciada correctamente");
      navigate("/dashboard"); // 👈 redirige al Dashboard
    } else {
      alert("❌ Usuario o contraseña incorrectos");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (page === "register") {
      saveAccount(email, password);
    } else {
      login(email, password);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{page === "login" ? "Iniciar Sesión" : "Registrarse"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">
          {page === "login" ? "Entrar" : "Crear cuenta"}
        </button>
      </form>

      <br />
      {page === "login" ? (
        <p>
          ¿No tienes cuenta?{" "}
          <button onClick={() => setPage("register")}>Regístrate</button>
        </p>
      ) : (
        <p>
          ¿Ya tienes cuenta?{" "}
          <button onClick={() => setPage("login")}>Inicia sesión</button>
        </p>
      )}
    </div>
  );
}

export default Login;
