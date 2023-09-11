import axios from "axios";

const TMDB_API_KEY = '';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
    baseURL: TMDB_BASE_URL,
    params: {
        api_key: TMDB_API_KEY,
        language: 'pt-BR'
    }
});

export default tmdbApi;
