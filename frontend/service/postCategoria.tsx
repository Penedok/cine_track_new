import axios from "axios";

export const postCategoria = async (categoria: string) => {
  try {
    const response = await axios.post("http://localhost:5000/categoria", {
      categoria,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    throw error;
  }
};

export default postCategoria;
