import React, { useEffect, useReducer } from "react";
import { getAllMovies } from "./components/Transportlayer";
import MovieList from "./components/MovieList";
import Loading from "./components/Loading";
import MovieDetail from "./pages/MovieDetail";

const ACTION = {
  API_SUCCESS: "API_SUCCESS",
  SET_SEARCH_VALUE: "SET_SEARCH_VALUE",
  SET_ONLY_WATCHED: "SET_ONLY_WATCHED",
  SET_SELECTED_MOVIE: "SET_SELECTED_MOVIE",
  SET_CHECKED: "SET_CHECKED",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.API_SUCCESS:
      return {
        ...state,
        movies: action.payload.movies,
        loading: false,
      };

    case ACTION.SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload.searchValue,
      };

    case ACTION.SET_ONLY_WATCHED:
      return { ...state, onlyWatched: action.payload.onlyWatched };

    case ACTION.SET_SELECTED_MOVIE:
      return { ...state, selectedMovie: action.payload.clickedMovie };

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, {
    movies: null,
    loading: true,
    searchValue: "",
    onlyWatched: false,
    selectedMovie: null,
  });

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        const movies = data.map((item) => ({
          id: item.id,
          name: item.name,
          watched: false,
          description: item.description,
        }));
        dispatch({ type: ACTION.API_SUCCESS, payload: { movies } });
      })
      .catch((error) => console.log(error));
  }, []);

  const handleCheckboxClick = (event, id, setChecked) => {
    const clickedMovieIndex = state.movies.findIndex(
      (movie) => movie.id === id
    );
    state.movies[clickedMovieIndex].watched = event.target.checked;
    setChecked(event.target.checked);
  };

  const getMovies = () => {
    const filteredMovies = getFilteredMovies(state.movies);
    return state.onlyWatched
      ? getOnlyWatchedMovies(filteredMovies)
      : filteredMovies;
  };

  const getFilteredMovies = (movies) => {
    return movies.filter((movie) =>
      movie.name.toLowerCase().includes(state.searchValue.toLowerCase())
    );
  };

  const getOnlyWatchedMovies = (movies) => {
    return movies.filter((movie) => movie.watched);
  };

  const handleSearch = (e) => {
    dispatch({
      type: ACTION.SET_SEARCH_VALUE,
      payload: { searchValue: e.target.value },
    });
  };

  const handleDetailButtonClick = (id) => {
    const clickedMovie = state.movies.filter((movie) => movie.id === id)[0];
    dispatch({ type: ACTION.SET_SELECTED_MOVIE, payload: { clickedMovie } });
  };

  const handleBackClick = () => {
    dispatch({
      type: ACTION.SET_SELECTED_MOVIE,
      payload: { clickedMovie: null },
    });
  };

  return state.loading ? (
    <Loading />
  ) : state.selectedMovie !== null ? (
    <MovieDetail movie={state.selectedMovie} onBackClick={handleBackClick} />
  ) : (
    <>
      <input
        type="checkbox"
        name="OnlyWatchedCheckbox"
        onChange={(e) =>
          dispatch({
            type: ACTION.SET_ONLY_WATCHED,
            payload: { onlyWatched: e.target.checked },
          })
        }
      />
      <label htmlFor="OnlyWatchedCheckbox">Show Watched Only</label>
      <br />
      <label htmlFor="searchBox">Search: </label>
      <input
        type="input"
        name="searchBox"
        value={state.searchValue}
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
