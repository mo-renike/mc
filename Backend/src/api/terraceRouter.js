const express = require('express');

const { terraceSectionHandler } = require('../controllers/terrace/terrace');
const { estateSectionHandler, getEstateHandler } = require('../controllers/terrace/terraceEstate');
const { terraceCourtSectionHandler } = require('../controllers/terrace/terraceCourt');



router = express.Router()
router
  .post('/estate', estateSectionHandler)
  .post('/court', terraceCourtSectionHandler)
  .post('', terraceSectionHandler)
  .get('', getEstateHandler)

module.exports = router;