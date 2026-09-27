import axios from 'axios'
import { apiUrl } from '../config/api'



export const deleteMovie = async(id:string)=>{
    try{
        const response = await axios.delete(`${apiUrl}/movies/${id}`)
        return response.data
    }catch(error){
        console.error('Erro ao remover filme:', error)
        return null
    }
}

export default deleteMovie