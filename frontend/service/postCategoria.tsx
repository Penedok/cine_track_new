import axios from "axios";
import { apiUrl } from "../config/api";

export const postCategoria = async (categoria: string) => {
  try {
    const response = await axios.post(`${apiUrl}/categoria`, {
      categoria,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    throw error;
  }
};

export default postCategoria;
