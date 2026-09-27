import axios from "axios";
import { apiUrl } from "../config/api";

export const    postSession = async(description:string,ids:number[]) => {

    try{
    const response = await axios.post(`${apiUrl}/sessoes`, {
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