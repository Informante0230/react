import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("session"));

  const logout = () => {
    localStorage.removeItem("session");
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bienvenido {user?.email} 🎉</h1>
      <p>Has iniciado sesión con éxito.</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}

export default Dashboard;
