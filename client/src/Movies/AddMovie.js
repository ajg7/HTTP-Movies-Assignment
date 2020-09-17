import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AddMovie = ({movieList, setMovieList}) => {
    const initialNewMovieValues = {
        title: "",
        director: "",
        metascore: "",
        stars: []
    }

    const [newMovie, setNewMovie] = useState(initialNewMovieValues);
    const history = useHistory();

    const changeHandler = event => {
        if(event.target.name === "stars") {
            setNewMovie({
                ...newMovie,
                [event.target.name]: [event.target.value]
            })
        } else {
            setNewMovie({
                ...newMovie,
                [event.target.name]: event.target.value
            })
        }
    }

    const submitHandler = event => {
        event.preventDefault();
        setNewMovie({
            ...newMovie
        })
        console.log(newMovie);
        axios.post("http://localhost:5000/api/movies/", newMovie)
            .then(response => {
                setMovieList(response.data)
                history.push("/");
            })
            .catch(error => {
                console.log(error);
            })
    }


    return(
        <>
        <h2>Add Movie</h2>
        <form onSubmit={submitHandler}>
            <label> Title: 
                <input 
                name="title"
                type="text"
                value={newMovie.title}
                onChange={changeHandler}
                />
            </label>
            <label> Director: 
                <input 
                name="director"
                type="text"
                value={newMovie.director}
                onChange={changeHandler}
                />
            </label>
            <label> Metascore: 
                <input 
                name="metascore"
                type="text"
                value={newMovie.metascore}
                onChange={changeHandler}
                />
            </label>
            <label> Stars: 
                <input 
                name="stars"
                type="text"
                value={newMovie.stars}
                onChange={changeHandler}
                />
            </label>
            <button>Add</button>
        </form>
    </>
    )
}

export default AddMovie;