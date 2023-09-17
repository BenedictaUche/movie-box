import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import tmdbApi from "../../services/api";
import "./Card.css";
import MovieCardItem from "../MovieCardItem/MovieCardItem";

export default function MovieCard({ searchResults, onMovieClick }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovieDetails(movieId) {
      try {
        const response = await tmdbApi.get(`/movie/${movieId}`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching movie details for ID ${movieId}:`, error);
        return null;
      }
    }

    async function getMoviesWithDetails() {
      const top10Movies = await tmdbApi.get("/movie/popular");
      const top10MovieIds = top10Movies.data.results
        .slice(0, 10)
        .map((movie) => movie.id);

      const movieDetailsPromises = top10MovieIds.map(fetchMovieDetails);
      const movieDetails = await Promise.all(movieDetailsPromises);
      setMovies(movieDetails.filter(Boolean));
    }

    getMoviesWithDetails();
  }, []);

  return (
    <div className="mx-12 my-20">
      <div className="flex justify-between">
        <h2 className="font-bold">Featured Movie</h2>
        <div className="font-medium text-pink-600 inline-flex cursor-pointer">
          <p>See more</p>
          <FaAngleRight className="block my-0 mx-auto" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <MovieCardItem movie={movie} />
          </Link>
        ))}
      </div>
    </div>
  );
}
