
const API_URL = "https://reflexoperu-v3.marketingmedico.vip/backend/public/api";

/**
 * Inicia sesión con la API del backend
 * @param {Object} credentials { email, password }
 */
export async function loginUser(credentials) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en loginUser:", error);
    throw error;
  }
}

/**
 * Registra un nuevo usuario
 * @param {Object} userData { name, email, password }
 */
export async function registerUser(userData) {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en registerUser:", error);
    throw error;
  }
}
