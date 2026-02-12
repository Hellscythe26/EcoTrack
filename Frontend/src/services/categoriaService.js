import axios from 'axios';

const API_URL = 'http://localhost:8080/api/categorias';

export const getCategorias = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const saveCategoria = async (nombre) => {
  const response = await axios.post(API_URL, { nombre });
  return response.data;
};