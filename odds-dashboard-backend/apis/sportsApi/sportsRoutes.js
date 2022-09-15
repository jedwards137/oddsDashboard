const express = require('express');
const {
  getAllSports,
  getSportById,
  postSport,
  deleteSport,
  patchSport
} = require('./sportsController');

const router = express.Router();

router.get('/', getAllSports);
router.get('/:id', getSportById);
router.post('/', postSport);
router.delete('/:id', deleteSport);
router.patch('/:id', patchSport);

module.exports = router;