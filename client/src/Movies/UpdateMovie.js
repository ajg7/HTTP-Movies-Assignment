import React from "react";

const UpdateMovie = props => {


    



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