import { React } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const AddMovie = () => {
    const history = useHistory();

    return (
        <>
            <h3> Add new movie below</h3>
            <div>
                <label> Movie title</label>
                <input></input>
                <br />
                <label>Poster image</label>
                <input
                    type="file"
                    accept="image/*"></input>
                <br />
                <label> Description</label>
                <input></input>
                <br />
                <label> Add one or more genres</label>
                <br />
                <select multiple>
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
                <button> Add new movie</button>
                <br />
                <br />
                <br />
                <br />
                <button onClick={() => history.push("/")}>
                    Cancel and go back to movie list
                </button>
            </div>
        </>
    );
};

export default AddMovie;
