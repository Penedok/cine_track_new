import axios from 'axios';

const getMovies = async ()=>{
    const response = await axios.get('http://localhost:5000/movies');

    if(response){
        return response.data;
    }else{
        console.log('Não foi possível carregar os filmes');
    }
   
}


export default getMovies;
