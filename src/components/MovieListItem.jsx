import React from "react";

export default function MovieListItem({ movie, checked, handleCheckboxclick }) {
  return (
    <>
      <input
        type="checkbox"
        id={movie.id}
        name={movie.name}
        checked={checked}
        onChange={handleCheckboxclick}
      />
      <label htmlFor={movie.id}>{movie.name}</label>
      <br />
    </>
  );
}
