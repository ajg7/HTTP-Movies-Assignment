import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovie from "./Movies/UpdateMovie";
import AddMovie from "./Movies/AddMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const history = useHistory();

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const deleteMovie = id => {
    setMovieList(movieList.filter(movie => {
      if(id === movie.id) {
        return false;
      } else {
        return true;
      }
    }))
  }

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const addMovieHandler = event => {
    event.preventDefault();
    history.push("/movie/add");
  }

  useEffect(() => {
    getMovieList();
    console.log(movieList)
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <button onClick={addMovieHandler}>Add Movie</button>

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} movieList={movieList} setMovieList={setMovieList} deleteMovie={deleteMovie} />
      </Route>

      <Route 
        exact path="/update-movie/:id"
        render={() =>  <UpdateMovie movieList={movieList} setMovieList={setMovieList} />}
        >
      </Route>

      <Route exact path="/movie/add">
        <AddMovie movieList={movieList} setMovieList={setMovieList} />
      </Route>
    </>
  );
};

export default App;
