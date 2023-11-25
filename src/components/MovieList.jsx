import React from "react";
import MovieListItem from "./MovieListItem";

export default function MovieList({ movies, handleCheckboxClick }) {
  return (
    <ul>
      {movies.map((movie) => (
        <MovieListItem
          key={movie.id}
          movie={movie}
          handleCheckboxclick={handleCheckboxClick}
          
        />
      ))}
    </ul>
  );
}
