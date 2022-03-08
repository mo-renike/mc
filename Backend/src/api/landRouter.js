const express = require('express');

const { landSectionHandler } = require('../controllers/land/land');
const { estateSectionHandler, getEstateHandler } = require('../controllers/land/landEstate');
const { courtSectionHandler } = require('../controllers/land/landCourt')



router = express.Router()
router
  .post('/estate', estateSectionHandler)
  .post('/court', courtSectionHandler)
  .post('', landSectionHandler)
  .get('', getEstateHandler)

module.exports = router;