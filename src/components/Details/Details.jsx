import { React } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Details = () => {
    // We'll use sagas to dispatch our "FETCH_MOVIES"
    const dispatch = useDispatch();
    const movies = useSelector((store) => store.movies);

    // dispatch/sagas axios GET request goes here

    // could add useEffect here to show items on page load

    // need to rewrite this to only show clicked on movie (probably via its ID in database)
    return (
        <div>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        {movie.id}
                        {movie.title}
                        {movie.poster}
                        {movie.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Details;
