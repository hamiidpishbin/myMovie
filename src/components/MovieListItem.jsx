import React, { useState } from "react";

export default function MovieListItem({
  movie,
  handleCheckboxClick,
  onDetailButtonClick,
}) {
  
  const [checked, setChecked] = useState(movie.watched);
  return (
    <li>
      <input
        type="checkbox"
        id={movie.id}
        name={movie.name}
        checked={checked}
        onChange={(e) => handleCheckboxClick(e, movie.id, setChecked)}
      />
      <label htmlFor={movie.id} style={{ marginRight: "5px" }}>
        {movie.name}
      </label>
      <button onClick={() => onDetailButtonClick(movie.id)}>Detail</button>
      <br />
    </li>
  );
}
