import axios from "axios";

const getCategorias = async () => {
  try {
    const response = await axios.get("http://localhost:5000/categoria");
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar as categorias:", error);
    return null;
  }
};

export default getCategorias;
