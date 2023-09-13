// MovieDetails.js
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import tmdbApi from "../../services/api";
import "./MovieDetails.css";
import { FaHome, FaVideo, FaTv, FaCalendar } from "react-icons/fa";
import { FaRightFromBracket, FaStar } from "react-icons/fa6";
import { Select, Text } from "@chakra-ui/react";
import { m } from "framer-motion";

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [credits, setCredits] = useState({});
  const [awards, setAwards] = useState([{}]);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await tmdbApi.get(`/movie/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.error(`Error fetching movie details for ID ${movieId}:`, error);
      }
    }

    async function fetchMovieCredits() {
      try {
        const response = await tmdbApi.get(`/movie/${movieId}/credits`);
        setCredits(response.data);
      } catch (error) {
        console.error(`Error fetching movie credits for ID ${movieId}:`, error);
      }
    }

    async function fetchMovieAwards() {
      try {
        const response = await tmdbApi.get(`/movie/${movieId}/awards`);
        setAwards(response.data.awards);
      } catch (error) {
        console.error(`Error fetching movie awards for ID ${movieId}:`, error);
      }
    }

    fetchMovieDetails();
    fetchMovieCredits();
    fetchMovieAwards();
  }, [movieId]);

  const genres = movie.genres?.map((genre) => genre.name).join(", ");
  const releaseYear = new Date(movie.release_date).getFullYear();

  const directors = credits.crew?.filter((person) => person.job === "Director");
  const writers = credits.crew?.filter(
    (person) => person.department === "Writing"
  );
  const stars = credits.cast?.slice(0, 5);

  return (
    <div className="details">
      <aside className="sidebar">
        <div className="aside_content">
          <div className="flex gap-6 align-middle py-10">
            <img src="../images/tv.png" alt="moviebox logo" />
            <p className="text-black-500 font-bold text-2xl text-center align-center">
              MovieBox
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <span className="flex gap-4">
              <FaHome /> <p className="text-lg font-sans font-medium">Home</p>
            </span>
            <span className="flex gap-4">
              <FaVideo />{" "}
              <p className="text-lg font-sans font-medium">Movies</p>
            </span>
            <span className="flex gap-4">
              <FaTv />{" "}
              <p className="text-lg font-sans font-medium">TV Series</p>
            </span>
            <span className="flex gap-4">
              <FaCalendar />{" "}
              <p className="text-lg font-sans font-medium">Upcoming</p>
            </span>
          </div>
        </div>

        <div className="aside_footer flex flex-col gap-1 bg-pink-200 border-pink-400 border-2 rounded-xl mt-10 w-52 leading-6 px-4 pt-8 pb-2">
          <h2 className="font-sans font-semibold text-gray-700">
            Play movie quizzes <br /> and earn
            <br />
            free tickets
          </h2>
          <p className="font-sans font-medium text-gray-500">
            50k people are playing now
          </p>
          <button className="px-2 py-[4px] bg-pink-400 text-pink-800 rounded-3xl font-sans font-semibold text-medium flex justify-center">
            Start playing
          </button>
        </div>

        <div className="flex gap-4 mt-6">
          <FaRightFromBracket />
          <p className="text-lg font-sans font-medium text-gray-600">Log out</p>
        </div>
      </aside>

      <main className="content">
        <div className="top">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-[100%] h-[20rem] rounded-xl"
          />
        </div>

        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-6">
            <div className="flex">
              <h2 className="font-bold text-2xl">{movie.title}</h2>
              <h2 className="">{new Date(movie.release_date).getFullYear()}</h2>
              <h2>{movie.pg}</h2>
            </div>

            <div className="movie-overview text-lg font-sans font-semibold text-gray-700">
              {movie.overview}
            </div>

            <div className="contibutors flex flex-col gap-4">
              <Text className="text-lg font-sans font-semibold">
                Director:{" "}
                <span className="text-pink-700">
                  {directors?.map((director) => director.name).join(", ")}
                </span>
              </Text>
              <Text className="text-lg font-sans font-semibold">
                Writers:{" "}
                <span className="text-pink-700">
                  {writers?.map((writer) => writer.name).join(", ")}
                </span>
              </Text>
              <Text className="text-lg font-sans font-semibold">
                Stars:{" "}
                <span className="text-pink-700">
                  {stars?.map((star) => star.name).join(", ")}
                </span>
              </Text>
            </div>

            <div className="top-rated">
              <Link>Top rated movie #{ movie.rating }</Link>
            </div>
            <div className="awards">
              <Select placeholder='Awards 9 nominations' className="w-72"></Select>
            </div>
          </div>

          <div className="side text-black flex flex-col gap-4 relative">
            <div className="flex absolute flex-row right-0">
              <span className="right-0"><FaStar className=" text-yellow-400" /></span>
              <span>{movie.vote_average} | {movie.vote_count}</span>
            </div>
            <div className="flex flex-col gap-3 mt-14">
              <Link className="bg-pink-700 text-white px-8 py-2 rounded-lg w-72 text-center">See Showtimes</Link>
              <Link className="bg-pink-100 border-2 border-pink-600 rounded-lg w-72 px-8 py-2 text-center">More Watch options</Link>
            </div>

          </div>
        </div>
        {/* <p>Genres: {movie.genres?.map((genre) => genre.name).join(", ")}</p> */}
      </main>
    </div>
  );
}
