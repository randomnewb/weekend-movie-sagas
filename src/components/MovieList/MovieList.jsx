import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import useHistory so we can go to '/detail'
import { useHistory } from "react-router-dom";
import "./MovieList.css";

function MovieList() {
    const dispatch = useDispatch();
    const movies = useSelector((store) => store.movies);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: "FETCH_MOVIES" });
    }, []);

    const handleDetail = (movie) => {
        console.log(movie);
        dispatch({ type: "FETCH_MOVIE", payload: movie });
        dispatch({ type: "FETCH_GENRE", payload: movie });
        history.push("/detail");
    };

    return (
        <main>
            <h1>MovieList</h1>
            <button onClick={() => history.push("/add")}> Add new movie</button>
            <section className="movies">
                {movies.map((movie) => {
                    return (
                        <div key={movie.id}>
                            <h3>{movie.title}</h3>
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                onClick={(e) => handleDetail(movie)}
                            />
                        </div>
                    );
                })}
            </section>
        </main>
    );
}

export default MovieList;
