import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MovieList from "../MovieList/MovieList";
import { useHistory } from "react-router-dom";

export default function MovieSearch() {
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();

  const handleMovieClick = (movieId) => {
    // Redirect to MovieDetails page with the selected movie ID
    history.push(`/movie/${movieId}`);
  };

  return (
    <>
      <SearchBar setSearchResults={setSearchResults} />
      <MovieList searchResults={searchResults} onMovieClick={handleMovieClick} />
    </>
  );
}
