import axios from 'axios';
import { apiUrl } from '../config/api';

const getMovies = async ()=>{
    const response = await axios.get(`${apiUrl}/movies`);

    if(response){
        return response.data;
    }else{
        console.log('Não foi possível carregar os filmes');
    }
   
}


export default getMovies;
