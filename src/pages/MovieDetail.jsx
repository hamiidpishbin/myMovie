import React from "react";

export default function MovieDetail({ movie, onBackClick }) {
  return (
    <>
      <button onClick={onBackClick}>Back</button>
      <h1>{movie.name}</h1>
      <div>{movie.description}</div>
    </>
  );
}
