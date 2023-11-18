import React from "react";

export default function MovieListItem(movie) {
  return <li key={movie.id}>{movie.name}</li>;
}
