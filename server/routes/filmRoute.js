const express = require(`express`);
const router = express.Router();
const pool = require(`../modules/pool`);

// DELETE selected film
router.delete(`/delete/:id`, (req, res)=>{
  let id = [req.params.id];
  let SQLquery = `DELETE FROM movies
                  USING movie_genre
                  WHERE movies.id = $1;`;
  pool.query(SQLquery, id)
  .then(result=>{
    res.sendStatus(200);
  })
  .catch(error=>{
    console.log('ERROR IN /delete/id DELETE film -------------------------------->', error);
    res.sendStatus(500);
  });
});

// DELETE film/genre pair from junction table
router.delete(`/junction`, (req, res)=>{
  let id = [req.body.movie_id, req.body.genre_id];
  let SQLquery = `DELETE FROM movie_genre
                  USING movies, genres
                  WHERE movie_id = $1 AND genre_id = $2;`;
  pool.query(SQLquery, id)
  .then(result=>{
    res.sendStatus(201);
  })
  .catch(error=>{
    console.log('ERROR IN /junction DELETE new junction -------------------------------->', error);
    res.sendStatus(500);
  });
});

// GET all films
router.get(`/`, (req, res)=>{
  let SQLquery = `SELECT movies.id as movie_id, movies.title, movies.poster, movies.description, array_agg(genres.name) as genres
                  FROM movies 
                  LEFT JOIN movie_genre ON movies.id = movie_genre.movie_id
                  LEFT JOIN genres ON genres.id = movie_genre.genre_id
                  GROUP BY movies.id
                  ORDER BY lower(title);`;
  pool.query(SQLquery)
  .then(result=>{
    res.send(result.rows);
  })
  .catch(error=>{
    console.log('ERROR IN / GET film -------------------------------->', error);
    res.sendStatus(500);
  });
});

// GET all genres
router.get(`/genre`, (req, res)=>{
  let SQLquery = `SELECT * FROM genres;`;
  pool.query(SQLquery)
  .then(result=>{
    res.send(result.rows);
  })
  .catch(error=>{
    console.log('ERROR IN /genre GET -------------------------------->', error);
    res.sendStatus(500);
  });
});

// GET searched film(s)
router.get(`/search/:id`, (req, res)=>{
  let id = ['%' + req.params.id + '%'];
  let SQLquery = `SELECT movies.id as movie_id, movies.title, movies.poster, movies.description, array_agg(genres.name) as genres
                  FROM movies
                  LEFT JOIN movie_genre ON movies.id = movie_genre.movie_id
                  LEFT JOIN genres ON genres.id = movie_genre.genre_id
                  WHERE lower(movies.title) SIMILAR TO $1
                  GROUP BY movies.id
                  ORDER BY title;`;
  pool.query(SQLquery, id)
  .then(result=>{
    res.send(result.rows);
  })
  .catch(error=>{
    console.log('ERROR IN /search/id GET -------------------------------->', error);
    res.sendStatus(500);
  });
});

// GET selected film and genre
router.get(`/this/:id`, (req, res)=>{
  let id = [req.params.id];
  let SQLquery = `SELECT movies.id as movie_id, movies.title, movies.poster, movies.description, array_agg(genres.name) as genres
                  FROM movies
                  LEFT JOIN movie_genre ON movies.id = movie_genre.movie_id
                  LEFT JOIN genres ON genres.id = movie_genre.genre_id
                  WHERE movies.title = $1
                  GROUP BY movies.id;`;
  pool.query(SQLquery, id)
  .then(result=>{
    res.send(result.rows);
  })
  .catch(error=>{
    console.log('ERROR IN /this/id GET film -------------------------------->', error);
    res.sendStatus(500);
  });
});

// POST new film
router.post(`/`, (req, res)=>{
  let id = [req.body.title, req.body.poster, req.body.description];
  let SQLquery = `INSERT INTO movies(title, poster, description)
                  VALUES($1, $2, $3);`;
  pool.query(SQLquery, id)
  .then(result=>{
    res.sendStatus(201);
  })
  .catch(error=>{
    console.log('ERROR IN / POST new film -------------------------------->', error);
    res.sendStatus(500);
  });
});

// POST new genre
router.post(`/genre`, (req, res)=>{
  let id = [req.body.name];
  let SQLquery = `INSERT INTO genres(name)
                  VALUES($1);`;
  pool.query(SQLquery, id)
  .then(result=>{
    res.sendStatus(201);
  })
  .catch(error=>{
    console.log('ERROR IN /genre POST new genre -------------------------------->', error);
    res.sendStatus(500);
  });
});

// POST new film/genre pair to junction table
router.post(`/junction`, (req, res)=>{
  console.log('/junction WITH:-------------------', req.body.movie_id, req.body.genre_id);
  let id = [req.body.movie_id, req.body.genre_id];
  let SQLquery = `INSERT INTO movie_genre(movie_id, genre_id)
                  VALUES($1, $2);`;
  pool.query(SQLquery, id)
  .then(result=>{
    res.sendStatus(201);
  })
  .catch(error=>{
    console.log('ERROR IN /junction POST new junction -------------------------------->', error);
    res.sendStatus(500);
  });
});

router.put(`/:id`, (req, res)=>{
  let id = [req.params.id, req.body.title, req.body.poster, req.body.description];
  let SQLquery = `UPDATE movies 
                  SET title = $2, poster = $3, description = $4 
                  WHERE id = $1;`;
  pool.query(SQLquery, id)
  .then(result=>{
    res.sendStatus(200);
  })
  .catch(error=>{
    console.log('ERROR IN /id PUT film -------------------------------->', error);
    res.sendStatus(500);
  });
});

module.exports = router;