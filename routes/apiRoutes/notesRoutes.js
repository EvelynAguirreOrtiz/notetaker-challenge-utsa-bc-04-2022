const router = require('express').Router();

// const { filterByQuery, findById, createNewZookeeper, validateZookeeper } = require('../../lib/notes');
const { notes } = require('../../db/db');

router.get('/notes', (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  } res.json(results);
});

router.get('/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post('/notes', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();

  // if any data in req.body is incorrect, send 400 error back
  if (!validateZookeeper(req.body)) {
    res.status(400).send('The zookeeper is not properly formatted.');
  } else {
    const zookeeper = createNewZookeeper(req.body, notes);
    res.json(zookeeper);
  }
});

module.exports = router;