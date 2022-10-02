import { React } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const AddMovie = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    //Setter and getter, set the initial state of the movie object
    const [movie, setMovie] = useState({
        title: "",
        poster: "",
        description: "",
        genre_id: [],
    });

    //This handles the 'final' submission where we will
    //Add the movie via a dispatch (POST_MOVIE)
    //Then, return the user back to the movie list page
    const newMovieHandler = (e) => {
        e.preventDefault();
        console.log("Adding new movie", movie);
        dispatch({
            type: "POST_MOVIE",
            payload: movie,
        });
        history.push("/");
    };

    //This stack overflow article was extremely helpful with figuring out key/value pairs:
    //https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object
    //Here is the initial article that led me along:
    //https://stackoverflow.com/questions/57305109/using-react-hooks-with-more-than-one-key-value-pair-in-state-object

    const handleMovieFields = (e) => {
        //We take in a key/value pair, that has a name (key), and the value
        const { name, value } = e.target;
        //Use our setter (setMovie)
        setMovie((movie) => ({
            //Getter
            ...movie,
            //Key/Value pair
            [name]: value,
        }));
    };

    return (
        <>
            <h3> Add new movie below</h3>
            {/* Ultimately submits our inputs from the fields */}
            <form onSubmit={(e) => newMovieHandler(e)}>
                <label> Movie title</label>
                <input
                    required
                    type="text"
                    placeholder="Title"
                    // Name
                    name="title"
                    // This matches what is in our getter/setter
                    value={movie.title}
                    // Send to our function to handle the key/value pair setting
                    onChange={handleMovieFields}></input>
                <br />
                <label>Poster image</label>
                <input
                    required
                    type="text"
                    placeholder="Poster"
                    name="poster"
                    value={movie.poster}
                    onChange={handleMovieFields}></input>
                <br />
                <label> Description</label>
                <input
                    required
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={movie.description}
                    onChange={handleMovieFields}></input>
                <br />
                <label> Add one or more genres</label>
                <br />
                <select
                    multiple
                    name="genre_id"
                    value={movie.genre_id}
                    onChange={handleMovieFields}>
                    <option value="1"> Adventure </option>
                    <option value="2"> Animated </option>
                    <option value="3"> Biographical </option>
                    <option value="4"> Comedy </option>
                    <option value="5"> Disaster </option>
                    <option value="6"> Drama </option>
                    <option value="7"> Epic </option>
                    <option value="8"> Fantasy </option>
                    <option value="9"> Musical </option>
                    <option value="10"> Romantic </option>
                    <option value="11"> Science Fiction</option>
                    <option value="12"> Space-Opera </option>
                    <option value="13"> Superhero</option>
                </select>
                <br />
                <br />
                <button onChange={(e) => newMovieHandler(e)}>
                    Add new movie
                </button>
                <br />
                <br />
                <br />
                <br />
                <button onClick={() => history.push("/")}>
                    Cancel and go back to movie list
                </button>
            </form>
        </>
    );
};

export default AddMovie;
