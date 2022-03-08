const express = require('express');

const registerSectionHandler = require('../controllers/registration/register')
const accountVerifyHandler = require('../controllers/registration/verify')
const tokenVerificationHandler = require('../controllers/registration/generateToken')
const loginSectionHandler = require('../controllers/registration/login');

router = express.Router()
router
  .post('/signup', registerSectionHandler)
  .post('/account/verify', accountVerifyHandler)
  .post('/login', loginSectionHandler)
  .get('/generate/token', tokenVerificationHandler)

module.exports = router;