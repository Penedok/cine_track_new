import axios from "axios";

export const    postSession = async(description:string,ids:number[]) => {

    try{
    const response = await axios.post("http://localhost:5000/sessoes", {
      descricao: description,
      filmes_id: ids,
    })
    return response.data
} catch (error) {
    console.error("Erro ao criar sessão:", error);
    throw error;
}
};

export default postSession;