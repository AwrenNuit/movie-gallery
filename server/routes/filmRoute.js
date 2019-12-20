const express = require(`express`);
const router = express.Router();
const pool = require(`../modules/pool`);

router.get(`/`, (req, res)=>{
  console.log('in GET');
  let SQLquery = `SELECT * FROM movies;`;
  pool.query(SQLquery)
  .then(result=>{
    res.send(result.rows);
  })
  .catch(error=>{
    console.log('ERROR IN GET -------------------------------->', error);
    res.sendStatus(500);
  });
});

module.exports = router;