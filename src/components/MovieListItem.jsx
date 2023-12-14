import React from "react";

export default function MovieListItem({
  movie,
  checked,
  handleCheckboxClick,
  onDetailButtonClick,
}) {
  return (
    <>
      <input
        type="checkbox"
        id={movie.id}
        name={movie.name}
        checked={checked}
        onChange={(e) => handleCheckboxClick(e, movie.id)}
      />
      <label htmlFor={movie.id} style={{ marginRight: "5px" }}>
        {movie.name}
      </label>
      <button onClick={onDetailButtonClick}>Detail</button>
      <br />
    </>
  );
}
