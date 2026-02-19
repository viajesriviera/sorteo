import api from "./api";

// Obtener bloques con conteo de disponibles
export const obtenerBloques = async () => {
  const { data } = await api.get("/sorteo/bloques");
  return data;
};

// Obtener boletos disponibles por rango
export const obtenerBoletosPorRango = async (inicio, fin) => {
  const { data } = await api.get("/sorteo/rango", {
    params: { inicio, fin },
  });
  return data;
};

// Registrar participante
export const registrarParticipante = async (payload) => {
  const { data } = await api.post("/sorteo/registrar", payload);
  return data;
};
