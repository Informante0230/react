import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";



const injectStyles = () => {
  const id = "futuristic-styles";
  if (document.getElementById(id)) return;
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600&display=swap');

    body, html, #root {
      height: 100%;
      margin: 0;
      font-family: 'Orbitron', sans-serif;
      background: #050510;
      color: #fff;
      overflow: hidden;
    }

    /* Contenedor centrado */
    .center-container {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 1;
    }

    .card {
      background: rgba(255,255,255,0.05);
      padding: 40px;
      border-radius: 15px;
      backdrop-filter: blur(15px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.7);
      max-width: 380px;
      width: 90%;
      text-align: center;
      animation: fadeIn 1s ease;
    }

    h2, h1 {
      font-weight: 600;
      text-transform: uppercase;
      color: #00eaff;
      letter-spacing: 2px;
    }

    input {
      width: 100%;
      padding: 12px;
      margin: 10px 0;
      border: none;
      border-radius: 8px;
      outline: none;
      background: rgba(255,255,255,0.1);
      color: white;
      font-family: 'Orbitron', sans-serif;
    }

    button {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 8px;
      background: linear-gradient(90deg, #6a5acd, #00eaff);
      color: #fff;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      margin-top: 10px;
      position: relative;
      overflow: hidden;
      font-family: 'Orbitron', sans-serif;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    button::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 200%;
      height: 100%;
      background: linear-gradient(120deg, transparent, rgba(0,234,255,0.5), transparent);
      transition: 0.5s;
    }

    button:hover::before {
      left: 100%;
    }

    button:hover {
      transform: scale(1.05);
      box-shadow: 0 0 20px #00eaff;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  const style = document.createElement("style");
  style.id = id;
  style.innerHTML = css;
  document.head.appendChild(style);
};

// ===== Fondo con Vanta.js =====
function VantaBackground() {
  const vantaRef = useRef(null);
  const effectRef = useRef(null);

  useEffect(() => {
    if (!effectRef.current) {
      effectRef.current = NET({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x00eaff,
        backgroundColor: 0x050510,
        points: 12.0,
        maxDistance: 20.0,
        spacing: 15.0,
      });
    }
    return () => {
      if (effectRef.current) effectRef.current.destroy();
    };
  }, []);

  return <div ref={vantaRef} style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 0 }} />;
}


function Login() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => { injectStyles(); }, []);

  const saveAccount = (email, password) => {
    const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
    const exists = accounts.find((a) => a.email === email);
    if (exists) { alert("⚠️ Esa cuenta ya existe"); return false; }
    accounts.push({ email, password });
    localStorage.setItem("accounts", JSON.stringify(accounts));
    alert("✅ Cuenta creada");
    return true;
  };

  const doLogin = (email, password) => {
    const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
    const user = accounts.find((a) => a.email === email && a.password === password);
    if (user) {
      localStorage.setItem("session", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      alert("❌ Usuario o contraseña incorrectos");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "register") saveAccount(email, password);
    else doLogin(email, password);
  };

  return (
    <div className="center-container">
      <div className="card">
        <h2>{mode === "login" ? "Iniciar sesión" : "Registrarse"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">
            {mode === "login" ? "Entrar" : "Crear cuenta"}
          </button>
        </form>
        <p>
          {mode === "login" ? (
            <span>¿No tienes cuenta?{" "}
              <button onClick={() => setMode("register")}>Regístrate</button>
            </span>
          ) : (
            <span>¿Ya tienes cuenta?{" "}
              <button onClick={() => setMode("login")}>Inicia sesión</button>
            </span>
          )}
        </p>
      </div>
    </div>
  );
}


function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("session") || "null");

  const logout = () => {
    localStorage.removeItem("session");
    navigate("/");
  };

  return (
    <div className="center-container">
      <div className="card">
        <h1>Bienvenido 👋</h1>
        <p>{user?.email}</p>
        <button onClick={logout}>Cerrar sesión</button>
      </div>
    </div>
  );
}


export default function App() {
  return (
    <Router>
      <VantaBackground />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
