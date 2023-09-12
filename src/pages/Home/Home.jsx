import React, { useEffect, useState} from 'react';
import Header from '../../components/Header/Header';
import tmdbApi from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getMovies() {
      const response = await tmdbApi.get('/movie/popular');
      setMovies(response.data.results);
    }
    getMovies();
  }, []);

  return (
    <>
        <Header />
        {/* <div className='movies-container'>
            {movies.map(movie => (
                <div className='movie-card' key={movie.id}>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <div className='movie-info'>
                        <h3>{movie.title}</h3>
                        <span>{movie.vote_average}</span>
                    </div>
                </div>
            ))}
        </div> */}
        <MovieList />
    </>
  )
}
