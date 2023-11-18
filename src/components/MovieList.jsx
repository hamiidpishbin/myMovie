import React from "react";
import MovieListItem from "./MovieListItem";

export default function MovieList(movies) {
  const moviesList = Array.from(movies);
  return (
    <ul>
      {moviesList.map((movie) => (
        <MovieListItem movie={movie} />
      ))}
    </ul>
  );
}
