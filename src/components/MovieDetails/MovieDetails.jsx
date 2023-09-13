// MovieDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../services/api";
import "./MovieDetails.css";
import { FaHome, FaVideo, FaTv, FaCalendar } from "react-icons/fa";
import { FaRightFromBracket } from "react-icons/fa6";

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await tmdbApi.get(`/movie/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.error(`Error fetching movie details for ID ${movieId}:`, error);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  return (
    <div className="details">
      <aside className="sidebar">
        <div className="aside_content">

          <div className="flex">
            <img src="../images/tv.png" alt="moviebox logo" />
            <p className="text-black-500 font-bold">MovieBox</p>
          </div>
          <span><FaHome /> Home</span>
          <span><FaVideo /> Movies</span>
          <span><FaTv /> TV Series</span>
          <span><FaCalendar /> Upcoming</span>
        </div>

        <div className="aside_footer">
          <h2>Play movie quizzes and earn free tickets</h2>
          <p>50k people are playing now</p>
          <button className="bg-pink-600 text-white rounded-md px-4 py-2">Start playing</button>
        </div>

        <div>
          < FaRightFromBracket />
          <p>Log out</p>
        </div>





      </aside>
      <main className="content">
        <h2>{movie.title}</h2>
        <p>Release Date: {movie.release_date}</p>
        <p>Genres: {movie.genres?.map((genre) => genre.name).join(", ")}</p>
      </main>
    </div>
  );
}
