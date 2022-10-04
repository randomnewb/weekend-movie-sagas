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
    });

    //Setter/getter for genre_id
    const [genre_id, setGenres] = useState([]);

    //This handles the 'final' submission where we will
    //Add the movie via a dispatch (POST_MOVIE)
    //Then, return the user back to the movie list page
    const newMovieHandler = (e) => {
        e.preventDefault();
        console.log("Adding new movie", movie, genre_id);
        dispatch({
            type: "POST_MOVIE",
            //sending this payload as an object with movie and genre_id... it will cause problems later on in the server
            payload: { movie, genre_id },
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
    const options = [
        { value: "1", label: "Adventure" },
        { value: "2", label: "Animated" },
        { value: "3", label: "Biographical" },
        { value: "4", label: "Comedy" },
        { value: "5", label: "Disaster" },
        { value: "6", label: "Drama" },
        { value: "7", label: "Epic" },
        { value: "8", label: "Fantasy" },
        { value: "9", label: "Musical" },
        { value: "10", label: "Romantic" },
        { value: "11", label: "Science Fiction" },
        { value: "12", label: "Space-Opera" },
        { value: "13", label: "Superhero" },
    ];

    // How to handle and update 'multiple select' in React?
    // https://stackoverflow.com/questions/61671034/how-to-correctly-update-select-multiple-in-react
    // Great solution and the code sample was very helpful
    const handleGenres = (e) => {
        const genre_id = [...e.target.options]
            .filter((option) => option.selected)
            .map((x) => parseInt(x.value));
        console.log("Selected genres are", genre_id);
        setGenres({ genre_id });
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
                <textarea
                    required
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={movie.description}
                    onChange={handleMovieFields}></textarea>
                <br />
                <label> Add one or more genres</label>
                <br />
                <select
                    multiple
                    name="genre_id"
                    value={genre_id.genre_id}
                    options={options}
                    onChange={handleGenres}>
                    {options.map((item) => {
                        return (
                            <option
                                key={item.value}
                                value={item.value}>
                                {item.label}
                            </option>
                        );
                    })}
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
