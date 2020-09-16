import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const UpdateMovie = props => {
    const initialMovieValues = {
        title: "",
        director: "",
        metascore: "",
        stars: []
    }

    const [movie, setMovie] = useState(initialMovieValues);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movie/${id}`)
            .then(response => setMovie(response.data))
            .catch(error => console.log(error));
    }, [id])

    const changeHandler = event => {
        event.persist();
        let value = event.target.value
        if (event.target.name === "metascore") {
            value = parseInt(value, 10)
        }
        if (event.target.name === "stars") {
            value = value.split(",");
        }
        setMovie({
            ...movie,
            [event.target.name]: value
        })
    }

    const submitHandler = event => {
        event.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(response => {
                setMovie(response.data);
                history.push(`/movies/${id}`);
            })
            .catch(error => console.log(error))
    }



    return(
        <>
            <h2>Update Movie</h2>
            <form onSubmit={submitHandler}>
                <label> Title: 
                    <input 
                    name="title"
                    type="text"
                    value={movie.title}
                    onChange={changeHandler}
                    />
                </label>
                <label> Director: 
                    <input 
                    name="director"
                    type="text"
                    value={movie.director}
                    onChange={changeHandler}
                    />
                </label>
                <label> Metascore: 
                    <input 
                    name="metascore"
                    type="text"
                    value={movie.metascore}
                    onChange={changeHandler}
                    />
                </label>
                <label> Stars: 
                    <input 
                    name="stars"
                    type="text"
                    value={movie.stars}
                    onChange={changeHandler}
                    />
                </label>
                <button>Update</button>
            </form>
        </>
    )
}

export default UpdateMovie;