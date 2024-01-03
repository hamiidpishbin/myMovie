import React from "react";
import MovieListItem from "./MovieListItem";

export default function MovieList({
  movies,
  handleCheckboxClick,
  onDetailButtonClick,
}) {
  return (
    <ul style={{ listStyleType: "none" }}>
      {movies.map((movie) => (
        <MovieListItem
          key={movie.id}
          movie={movie}
          handleCheckboxClick={handleCheckboxClick}
          onDetailButtonClick={onDetailButtonClick}
        />
      ))}
    </ul>
  );
}
