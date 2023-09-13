import React, { useEffect, useState } from "react";
import tmdbApi from "../../services/api";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";

export default function Header() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchMovieBackdrop(currentPage);
  }, [currentPage]);

  const fetchMovieBackdrop = (page) => {
    tmdbApi
      .get("/movie/popular", {
        params: { api_key: "5046a04131d16b146972a8c11380c26f", page },
      })
      .then((response) => {
        const movieData = response.data.results;
        const totalPages = response.data.total_pages;
        setTotalPages(totalPages);
        const backdropUrls = movieData.map(
          (movie) => `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        );
        setMovies(backdropUrls);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDisplayedMovies = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return movies.slice(startIndex, endIndex);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div
        className="header-container bg-no-repeat bg-cover h-[30rem] bg-center relative"
        style={{ backgroundImage: `url(${getDisplayedMovies()[0]})` }}
      >
        <SearchBar />
        <div className="pagination flex flex-col absolute right-0 pr-4 text-white font-bold gap-4 drop-shadow-lg">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            1
          </button>

          <button
            onClick={handleNextPage}
            disabled={currentPage === 2}
          >
            2
          </button>
          <button onClick={handleNextPage} disabled={currentPage === 3}>
            3
          </button>
          <button onClick={handleNextPage} disabled={currentPage === 4}>
            4
          </button>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            5
          </button>
        </div>
      </div>
    </>
  );
}
