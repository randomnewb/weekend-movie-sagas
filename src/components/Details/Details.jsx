import { React } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Details = () => {
    const history = useHistory();
    const movies = useSelector((store) => store.movies);
    const genres = useSelector((store) => store.genres);

    // could add useEffect here to show items on page load? or use reducers?
    // maybe use Route and '/movie/id'

    // need to rewrite this to only show clicked on movie (probably via its ID in database)
    return (
        <div>
            {movies.map((movie) => (
                <div key={movie.id}>
                    <h2>{movie.title}</h2>

                    <img src={movie.poster}></img>
                    <h3>{movie.description}</h3>
                </div>
            ))}
            {genres.map((genre) => (
                <ul key={genre.id}>
                    <li>{genre.name}</li>
                </ul>
            ))}
            <button onClick={() => history.go(-1)}> Back to Movies List</button>
        </div>
    );
};

export default Details;
