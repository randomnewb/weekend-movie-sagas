const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
    // Add query to get all genres
    const sql = `
  SELECT * FROM genres ORDER BY "name" ASC;
  `;
    pool.query(sql)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const sql = `
    SELECT * FROM movies
    JOIN movies_genres ON movies_genres.movie_id = movies.id
    JOIN genres ON movies_genres.genre_id = "genres".id
    WHERE movies.id = $1;
`;
    pool.query(sql, [id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log("Error getting specific genre", error);
            res.sendStatus(500);
        });
});

module.exports = router;
