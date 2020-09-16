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

    }



    return(
        <>
            <h2>Update Movie</h2>
            <form onSubmit={}>
                <label> Title: 
                    <input 
                    name="title"
                    type="text"
                    value=""
                    onChange={}
                    />
                </label>
                <label> Director: 
                    <input 
                    name="director"
                    type="text"
                    value=""
                    onChange={}
                    />
                </label>
                <label> Metascore: 
                    <input 
                    name="metascore"
                    type="text"
                    value=""
                    onChange={}
                    />
                </label>
                <label> Stars: 
                    <input 
                    name="stars"
                    type="text"
                    value=""
                    onChange={}
                    />
                </label>
                <button>Update</button>
            </form>
        </>
    )
}

export default UpdateMovie;