import axios from "axios";

export const deleteSession = async (id: number) => {
  try {
    const response = await axios.delete(`http://localhost:5000/sessoes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao remover sessão:", error);
    return null;
  }
};

export default deleteSession;
