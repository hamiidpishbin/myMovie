import React, { useState, useEffect } from "react";
import { getAllMovies } from "./components/Transportlayer";
import MovieList from "./components/MovieList";
import Loading from "./components/Loading";
import MovieDetail from "./pages/MovieDetail";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onlyWatched, setOnlyWatched] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        const tempMovies = data.map((item) => ({
          id: item.id,
          name: item.name,
          watched: false,
          description: item.description,
        }));
        setMovies(tempMovies);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [movies]);

  const handleCheckboxClick = (event, id) => {
    const clickedMovieIndex = movies.findIndex((movie) => movie.id === id);
    movies[clickedMovieIndex].watched = event.target.checked;
  };

  const getMovies = () => {
    const filteredMovies = getFilteredMovies(movies);
    return !onlyWatched ? filteredMovies : getOnlyWatchedMovies(filteredMovies);
  };

  const getOnlyWatchedMovies = (movies) => {
    return movies.filter((movie) => movie.watched);
  };

  const getFilteredMovies = (movies) => {
    return movies.filter((movie) =>
      movie.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleDetailButtonClick = (id) => {
    const clickedMovie = movies.filter((movie) => movie.id === id)[0];
    setSelectedMovie(clickedMovie);
  };

  const handleBackClick = () => {
    setSelectedMovie(null);
  };

  return loading ? (
    <Loading />
  ) : selectedMovie !== null ? (
    <MovieDetail movie={selectedMovie} onBackClick={handleBackClick} />
  ) : (
    <>
      <input
        type="checkbox"
        name="OnlyWatchedCheckbox"
        onChange={(e) => setOnlyWatched(e.target.checked)}
      />
      <label htmlFor="OnlyWatchedCheckbox">Show Watched Only</label>
      <br />
      <label htmlFor="searchBox">Search: </label>
      <input
        type="input"
        name="searchBox"
        value={searchValue}
        onChange={handleSearch}
      />
      <MovieList
        movies={getMovies()}
        handleCheckboxClick={handleCheckboxClick}
        onDetailButtonClick={handleDetailButtonClick}
      />
    </>
  );
}

export default App;
