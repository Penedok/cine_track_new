import axios from "axios";

const getSessions = async () => {
  try {
    const response = await axios.get("http://localhost:5000/sessoes");
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar as sessões:", error);
    return null;
  }
};

export default getSessions;
