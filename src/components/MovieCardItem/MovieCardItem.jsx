import React from "react";
import { Card, CardHeader, CardBody, Text } from "@chakra-ui/react";

function getCountryAbbreviation(countryName) {
  const countryAbbreviations = {
    "United States of America": "USA",
    "United Kingdom": "UK",
  };

  return countryAbbreviations[countryName] || countryName;
}

export default function MovieCardItem({ movie }) {
  return (
    <Card className="bg-gray-100" data-testid="movie-card">
      <CardHeader>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className=""
          data-testid="movie-poster"
        />
      </CardHeader>
      <CardBody>
        <Text>
          {movie.production_countries
            .map((country) => getCountryAbbreviation(country.name))
            .join(", ")}
          ,{" "}
          <Text className="" data-testid="movie-release-date">
            {new Date(movie.release_date).getFullYear()}
          </Text>
        </Text>
        <Text className="text-md font-bold" data-testid="movie-title">
          {movie.title}
        </Text>
        <div className="flex justify-between gap-4">
          <div className="flex">
            <img
              src="../images/imdb.png"
              alt="imdb rating"
              className="rating-logo"
            />
            <Text className="text-md font-bold">
              {Math.floor(movie.vote_average * 10)} / 100
            </Text>
          </div>
          <div className="flex gap-2">
            <img src="../images/rotten_tomato.png" alt="tomato rating" />
            <Text className="">{movie.vote_count}</Text>
          </div>
        </div>
        <Text className="text-slate-500 mt-3">
          {movie.genres
            .slice(0, 3)
            .map((genre) => genre.name)
            .join(", ")}
        </Text>
      </CardBody>
    </Card>
  );
}
