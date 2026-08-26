import axios from 'axios'

export const postMovie = async(title:string,
    ano:string,
    genero:string,
    status:string,
    avaliacao:string,
    review:string,
)=>{
    try{
        const response = await axios.post('http://localhost:5000/movies',{
            title,
            ano,
            genero,
            status,
            avaliacao,
            review,
        })
        return response.data
    }catch(error){
        console.error('Erro ao adicionar filme:', error)
        return null
    }
}

export default postMovie