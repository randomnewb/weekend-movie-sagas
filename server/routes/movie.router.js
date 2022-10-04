const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
    const query = `SELECT * FROM movies ORDER BY "title" ASC`;
    pool.query(query)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            console.log("ERROR: Get all movies", err);
            res.sendStatus(500);
        });
});

// GET by ID
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const sql = `
  SELECT * FROM "movies"
  WHERE "movies"."id" = $1;
  `;
    pool.query(sql, [id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log("Error getting specific movie", error);
            res.sendStatus(500);
        });
});
router.post("/", (req, res) => {
    // Because our payload of movies.data was an object with a
    // movies and and genre_id property (of which had some of its own properties or an array)
    // we need to 'convert' it to something that matches the SQL queries and the database columns
    req.body.title = req.body.movie.title;
    req.body.poster = req.body.movie.poster;
    req.body.description = req.body.movie.description;
    req.body.genre_id = req.body.genre_id.genre_id;
    // Get rid of the objects for good measure now that we have set them to req.body itself
    delete req.body.genre_id.genre_id;
    delete req.body.movie;
    console.log(req.body);
    // RETURNING "id" will give us back the id of the created movie
    const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`;
    // FIRST QUERY MAKES MOVIE
    pool.query(insertMovieQuery, [
        req.body.title,
        req.body.poster,
        req.body.description,
    ])
        .then((result) => {
            console.log("New Movie Id:", result.rows[0].id, req.body); //ID IS HERE!

            const createdMovieId = result.rows[0].id;
            // Now handle the genre reference
            const insertMovieGenreQuery = `
            INSERT INTO "movies_genres" ("movie_id", "genre_id")
            VALUES  ($1, $2);
            `;
            // req.body.genre_id is an array of all the selected genre_ids
            // iterate through each one, sending our query above until
            // we have an entry for each genre_id
            for (let i = 0; req.body.genre_id.length > i; i++) {
                // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
                pool.query(insertMovieGenreQuery, [
                    createdMovieId,
                    // Be sure to add the [i] as we are going entry by entry because of the array/for loop
                    req.body.genre_id[i],
                ]);
            }
            // Catch for first query
            // Did you know you can't send multiple 'res' or responses for a single request?
            // Moving these outside of the loop and sending the response after it was all done
            // fixed the server crashing :)
        })
        .then((result) => {
            //Now that both are done, send back success!
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

module.exports = router;
