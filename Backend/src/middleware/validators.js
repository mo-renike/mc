const { check } = require('express-validator');

const terraceValiditorHandler = async (req) => {
  await check("terrace_name").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("_id_user").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("terrace_price").notEmpty().withMessage("must not be empty").trim().isInt().withMessage("must be integer").run(req);
  await check("no_estates").notEmpty().withMessage("must not be empty").trim().isInt().withMessage("must be integer").run(req);
  await check("max_month").notEmpty().withMessage("must not be empty").trim().isInt().withMessage("must be integer").run(req);
  await check("interest_rate").notEmpty().withMessage("must not be empty").trim().isInt().withMessage("must be integer").run(req);
}

const terraceCourtValiditorHandler = async (req) => {
  await check("_id_user").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("estate_name").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("terrace_name").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("court_name").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("no_unit_available").notEmpty().withMessage("must not be empty").trim().isInt().withMessage("must be integer").run(req);
  await check("description").notEmpty().withMessage("must not be empty").isLength({
    max: 150
  }).withMessage("max char of 150 words").trim().isString().withMessage("must be string").run(req);
}

const terraceEstateValiditorHandler = async (req) => {
  await check("no_courts").trim().isString().withMessage("must be integer").run(req);
  await check("_id_user").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("estate_name").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("terrace_name").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("location").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("land_size").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string with width and length format: 225 X 255").run(req)
  await check("description").trim().isString().withMessage("must be string").isLength({
    max: 150
  }).withMessage("max char of 150 words").run(req);
}

const landEstateValiditorHandler = async (req) => {
  await check("no_courts").trim().isString().withMessage("must be integer").run(req);
  await check("_id_user").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("estate_name").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("land_name").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("location").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("land_size").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string with width and length format: 225 X 255").run(req)
  await check("description").trim().isString().withMessage("must be string").isLength({
    max: 150
  }).withMessage("max char of 150 words").run(req);
}

const landCourtValiditorHandler = async (req) => {
  await check("_id_user").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("estate_name").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("land_name").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("close_name").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("no_unit_available").notEmpty().withMessage("must not be empty").trim().isInt().withMessage("must be integer").run(req);
  await check("description").notEmpty().withMessage("must not be empty").isLength({
    max: 150
  }).withMessage("max char of 150 words").trim().isString().withMessage("must be string").run(req)
}

const landValiditorHandler = async (req) => {
  await check("land_name").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("_id_user").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("land_price").notEmpty().withMessage("must not be empty").trim().isInt().withMessage("must be integer").run(req);
  await check("no_estates").notEmpty().withMessage("must not be empty").trim().isInt().withMessage("must be integer").run(req);
  await check("max_month").notEmpty().withMessage("must not be empty").trim().isInt().withMessage("must be integer").run(req);
  await check("interest_rate").notEmpty().withMessage("must not be empty").trim().isInt().withMessage("must be integer").run(req);
}

const registrationValiditorHandler = async (req) => {
  await check("first_name").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("last_name").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("user_email").notEmpty().withMessage("must not be empty").trim().isEmail().withMessage("must be valid email address").run(req);
  await check("user_phone").notEmpty().withMessage("must not be empty").trim().isMobilePhone('any', { strictMode: true }).withMessage("must be valid mobile phone number").run(req);
  await check("marital_status").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("nationality").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("date_of_birth").notEmpty().withMessage("must not be empty").isDate({ format: "YYYY/MM/DD", strictMode: true }).withMessage("must be valid date").run(req);
  await check("password").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("comfirmed_password").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").run(req);
  await check("id_user_access_level").notEmpty().withMessage("must not be empty").trim().isInt().withMessage("must be integer").run(req);
}

const loginValiditorHandler = async (req) => {
  await check("user_password").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be valid password").run(req);
  await check("user_email").notEmpty().withMessage("must not be empty").trim().isEmail().withMessage("must be valid email address").run(req);
}

const verificationValiditorHandler = async (req) => {
  await check("user_email").notEmpty().withMessage("must not be empty").trim().isEmail().withMessage("must be valid email address").run(req);
  await check("verification_code").notEmpty().withMessage("must not be empty").trim().isString().withMessage("must be string").isLength({
    max: 6
  }).withMessage("max 6 values required").run(req);
}



module.exports = {
  terraceCourtValiditorHandler,
  registrationValiditorHandler,
  verificationValiditorHandler,
  terraceValiditorHandler,
  landValiditorHandler,
  terraceEstateValiditorHandler,
  landEstateValiditorHandler,
  landCourtValiditorHandler,
  loginValiditorHandler
}