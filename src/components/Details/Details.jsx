import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Details = () => {
    const history = useHistory();
    const movies = useSelector((store) => store.movies);
    const genres = useSelector((store) => store.genres);
    return (
        <div>
            {movies.map((movie) => (
                <div key={movie.id}>
                    <h2>{movie.title}</h2>

                    <img src={movie.poster}></img>
                    <h3>{movie.description}</h3>
                </div>
            ))}
            <h2> Genres</h2>
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
