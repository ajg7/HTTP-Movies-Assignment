import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const deleteHandler = event => {
    event.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(response => {
        history.push("/")
      })
      .catch(error => console.log(error))
  }

  const changeHandler = event => {
    history.push(`/update-movie/${movie.id}`)
  }

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button">
        <button onClick={saveMovie}>Save</button>
      </div>
      <button onClick={changeHandler}>Update Movie</button>
      <button onClick={deleteHandler}>Delete</button>
    </div>
  );
}

export default Movie;
