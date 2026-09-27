import axios from "axios";
import { apiUrl } from "../config/api";

const getCategorias = async () => {
  try {
    const response = await axios.get(`${apiUrl}/categoria`);
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar as categorias:", error);
    return null;
  }
};

export default getCategorias;
