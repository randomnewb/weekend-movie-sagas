import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App.js";
import { createStore, combineReducers, applyMiddleware } from "redux";
// Provider allows us to use redux within our react app
import { Provider } from "react-redux";
import logger from "redux-logger";
// Import saga middleware
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery("FETCH_MOVIES", fetchAllMovies);
    yield takeEvery("FETCH_MOVIE", fetchMovieDetail);
    yield takeEvery("FETCH_GENRES", fetchAllGenres);
    yield takeEvery("FETCH_GENRE", fetchGenreDetail);
    yield takeEvery("POST_MOVIE", postMovie);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get("/api/movie");
        console.log("get all:", movies.data);
        yield put({ type: "SET_MOVIES", payload: movies.data });
    } catch {
        console.log("get all error");
    }
}

function* fetchMovieDetail(action) {
    try {
        // console.log(action);
        const movie = yield axios.get(`/api/movie/${action.payload.id}`);
        yield put({
            type: "SET_MOVIE",
            payload: movie.data,
        });
    } catch (error) {
        console.log("Error getting movie details", error);
        alert("Something went wrong");
    }
}

function* fetchAllGenres() {
    try {
        console.log("Fetching genres");
        const genres = yield axios.get("/api/genre");
        console.log("get all:", genres.data);
        yield put({ type: "SET_GENRES", payload: genres.data });
    } catch (error) {
        console.log("Error getting genres", error);
        alert("Something went wrong");
    }
}

function* fetchGenreDetail(action) {
    try {
        // console.log(action);
        const genre = yield axios.get(`/api/genre/${action.payload.id}`);
        yield put({
            type: "SET_GENRE",
            payload: genre.data,
        });
    } catch (error) {
        console.log("Error getting specific genres", error);
        alert("Something went wrong");
    }
}

function* postMovie(action) {
    try {
        yield axios.post("/api/movie", action.payload);
        yield put({
            type: "FETCH_MOVIES",
        });
    } catch (error) {
        console.log("Error posting movie", error);
        alert("Something went wrong");
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case "SET_MOVIES":
            return action.payload;
        case "SET_MOVIE":
            return action.payload;
        default:
            return state;
    }
};

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case "SET_GENRES":
            return action.payload;
        case "SET_GENRE":
            return action.payload;
        default:
            return state;
    }
};

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
