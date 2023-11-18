import React, { useState, useEffect } from "react";
import { getAllMovies } from "./components/Transportlayer";
import MovieList from "./components/MovieList";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return <MovieList movies={movies} />;
}

export default App;
