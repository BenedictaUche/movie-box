import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Text } from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";
import tmdbApi from "../../services/api";

export default function MovieCard() {

    const [movies, setMovies] = useState([]);


    useEffect(() => {
        async function getMovies() {
            const response = await tmdbApi.get('/movie/popular');
            setMovies(response.data.results);
        }
        getMovies();
    }, [])


  return (
    <div className="mx-10 my-20">
      <div className="flex justify-between">
        <h2 className="font-bold">Featured Movie</h2>
        <div className="font-medium text-pink-600 inline-flex cursor-pointer">
          <p>See more</p>
          <FaAngleRight className="block my-0 mx-auto"/>
        </div>
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10">
            {movies.map(movie => (
                <Card key={movie.id} className="bg-gray-100">
                    <CardHeader>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    </CardHeader>
                    <CardBody>
                        <Text>{movie.title}</Text>
                    </CardBody>
                    <CardFooter>
                        <Text>{movie.vote_average}</Text>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
  );
}
