import axios from "axios";
import { apiUrl } from "../config/api";

export const deleteSession = async (id: number) => {
  try {
    const response = await axios.delete(`${apiUrl}/sessoes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao remover sessão:", error);
    return null;
  }
};

export default deleteSession;
