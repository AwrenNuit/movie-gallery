const express = require(`express`);
const router = express.Router();
const pool = require(`../modules/pool`);

// DELETE selected film
router.delete(`/delete/:id`, (req, res)=>{
  console.log('in `/delete/id DELETE with:', req.params.id);
  let id = [req.params.id];
  let SQLquery = `DELETE FROM movies
                  USING movie_genre
                  WHERE movies.id = $1;`;
  pool.query(SQLquery, id)
  .then(result=>{
    res.send(200);
  })
  .catch(error=>{
    console.log('ERROR IN /delete/id DELETE film -------------------------------->', error);
    res.sendStatus(500);
  });
});

// GET all films
router.get(`/`, (req, res)=>{
  console.log('in / GET');
  let SQLquery = `SELECT *, array_agg(genres.name)
                  FROM movies
                  JOIN movie_genre ON movies.id = movie_genre.movie_id
                  JOIN genres ON genres.id = movie_genre.genre_id
                  GROUP BY movies.id, movie_genre.id, genres.id
                  ORDER BY title;`;
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
  console.log('in /genre GET');
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
  console.log('in /search/id GET with:', req.params.id);
  let id = ['%' + req.params.id + '%'];
  let SQLquery = `SELECT * , genres.name
                  FROM movies
                  JOIN movie_genre ON movies.id = movie_genre.movie_id
                  JOIN genres ON genres.id = movie_genre.genre_id
                  WHERE lower(title) SIMILAR TO $1;`;
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
  console.log('in /this/id GET');
  let id = [req.params.id];
  let SQLquery = `SELECT *, genres.name
                  FROM movies
                  JOIN movie_genre on movies.id = movie_genre.movie_id
                  JOIN genres on genres.id = movie_genre.genre_id
                  WHERE movies.id = $1;`;
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
  console.log('in / POST new film with:', req.body);
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
  console.log('in / POST new genre with:', req.body);
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

// PUT route to update film values in database ////////////////////////////////BROKEN////////////////////
router.put(`/:id`, (req, res)=>{
  console.log('in /id PUT with:', req.params, req.body);
  let id = [req.params.id, req.body.title, req.body.poster, req.body.description]; //req.params.name
  let SQLquery = `UPDATE movies SET title = $2, poster = $3, description = $4 WHERE id = $1;`; //INSERT INTO movie_genre(movie_id, genre_id) JOIN genres ON genres.id = movie_genre.genre_id WHERE genres.name = $5 VALUES($1, genres.id);
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