import React, { useState, useEffect } from "react";
import { getAllMovies } from "./components/Transportlayer";
import MovieList from "./components/MovieList";
import Loading from "./components/Loading";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        const tempMovies = data.map((item) => ({
          id: item.id,
          name: item.name,
          watched: false,
        }));
        setMovies(tempMovies);
        setFilteredMovies(tempMovies);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [movies]);

  const handleCheckboxClick = (event) => {
    const clickedMovieIndex = movies.findIndex(
      (movie) => movie.id === parseInt(event.target.id)
    );
    movies[clickedMovieIndex].watched = event.target.checked;
  };

  const handleFilteredMovies = (event) => {
    if (event.target.checked) {
      const filteredMovies = movies.filter((movie) => movie.watched);
      setFilteredMovies(filteredMovies);
    } else {
      setFilteredMovies(movies);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <input
        type="checkbox"
        name="OnlyWatchedCheckbox"
        onChange={handleFilteredMovies}
      />
      <label htmlFor="OnlyWatchedCheckbox">Show Watched Only</label>
      <MovieList
        movies={filteredMovies}
        handleCheckboxClick={handleCheckboxClick}
      />
    </>
  );
}

export default App;
