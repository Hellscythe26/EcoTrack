import axios from 'axios';

const API_URL = "http://localhost:8080/api/lotes";

export const saveLote = async (lote) => {
    const response = await axios.post(API_URL, lote);
    return response.data;
};

export const getLotes = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getAlertasVencimiento = async (dias = 7) => {
    const res = await axios.get(`${API_URL}/alertas-vencimiento?dias=${dias}`);
    return res.data;
};