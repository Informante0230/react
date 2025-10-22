import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";


const injectStyles = () => {
  const id = "particles-styles";
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

    #particles-js {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 0;
    }

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
      color: #ffffffff;
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


function ParticlesBackground() {
  useEffect(() => {
    injectStyles();

   
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS("particles-js", {
          particles: {
            number: { value: 80 },
            color: { value: "#00eaff" },
            shape: { type: "circle" },
            opacity: { value: 0.6 },
            size: { value: 3 },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#00eaff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              out_mode: "out",
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" },
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
              push: { particles_nb: 4 },
            },
          },
          retina_detect: true,
        });
      }
    };
    document.body.appendChild(script);

    return () => script.remove();
  }, []);

  return <div id="particles-js"></div>;
}


function Login() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const saveAccount = (email, password) => {
    const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
    const exists = accounts.find((a) => a.email === email);
    if (exists) {
      alert("⚠️ Esa cuenta ya existe");
      return false;
    }
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
      <ParticlesBackground />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
