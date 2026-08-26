import axios from 'axios'



export const deleteMovie = async(id:string)=>{
    try{
        const response = await axios.delete(`http://localhost:5000/movies/${id}`)
        return response.data
    }catch(error){
        console.error('Erro ao remover filme:', error)
        return null
    }
}

export default deleteMovie