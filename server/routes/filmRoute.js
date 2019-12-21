const express = require(`express`);
const router = express.Router();
const pool = require(`../modules/pool`);

// GET all films
router.get(`/`, (req, res)=>{
  console.log('in GET');
  let SQLquery = `SELECT * FROM movies;`;
  pool.query(SQLquery)
  .then(result=>{
    res.send(result.rows);
  })
  .catch(error=>{
    console.log('ERROR IN GET movie -------------------------------->', error);
    res.sendStatus(500);
  });
});

// GET all genres
router.get(`/genre`, (req, res)=>{
  console.log('in GET');
  let SQLquery = `SELECT * FROM genres;`;
  pool.query(SQLquery)
  .then(result=>{
    res.send(result.rows);
  })
  .catch(error=>{
    console.log('ERROR IN GET genre -------------------------------->', error);
    res.sendStatus(500);
  });
});

// GET selected film and genre
router.get(`/this/:id`, (req, res)=>{
  console.log('in GET');
  let id = [req.params.id];
  let SQLquery = `SELECT movies.title, movies.poster, movies.description, genres.name
                  FROM genres
                  JOIN movie_genre on genres.id = movie_genre.genre_id
                  JOIN movies on movies.id = movie_genre.movie_id
                  WHERE movies.id = $1;`;
  pool.query(SQLquery, id)
  .then(result=>{
    res.send(result.rows);
  })
  .catch(error=>{
    console.log('ERROR IN GET movie -------------------------------->', error);
    res.sendStatus(500);
  });
});

module.exports = router;