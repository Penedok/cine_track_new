import axios from "axios";
import { apiUrl } from "../config/api";

const getSessions = async () => {
  try {
    const response = await axios.get(`${apiUrl}/sessoes`);
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar as sessões:", error);
    return null;
  }
};

export default getSessions;
