
const { validationResult } = require('express-validator');


const handler = require('../../middleware/handler')
const { userExceptionError } = require('../../../helper/exceptionErrors')
const { registrationValiditorHandler } = require('../../middleware/validators')
const registrationServices = require('../../services/registration');

const api_name = "/api/v1/registration/signup";
let validateErrors = null;


const registerSectionHandler = async (req, res) => {
  try {

    const body = req.body;

    if (!body || JSON.stringify(body) === "{}") {
      throw new userExceptionError([], 'body is empty');
    };

    const all_fields = Object.keys(body);
    const all_values = Object.keys(body);

    await registrationValiditorHandler(req);
    validateErrors = validationResult(req);


    const required_fields = [
      "first_name",
      "last_name",
      "user_email",
      "user_phone",
      "marital_status",
      "nationality",
      "date_of_birth",
      "password",
      "comfirmed_password",
      "id_user_access_level"
    ]

    const missing_values = all_values.filter((field) => body[field] === null || body[field] === "");
    const missing_fields = required_fields.filter((field) => !all_fields.includes(field));


    if (missing_fields.length > 0) {
      throw new userExceptionError(missing_fields, `${missing_fields} field is missing`);
    }

    if (missing_values.length > 0) {
      const errors = { status: 400 }
      missing_values.forEach((err) => {
        errors[err] = err
      })
      throw new userExceptionError(missing_values, `${missing_values} cannot be null`);
    }

    if (!validateErrors.isEmpty()) {
      let error = {};
      let msg = []
      validateErrors.errors.forEach((err) => {
        error[err.param] = err.msg
        msg = [...msg, err.msg]
      })
      throw new userExceptionError(Object.keys(error).toString(), `${msg}`);
    };

    const record = {
      first_name,
      last_name,
      user_email,
      user_phone,
      marital_status,
      nationality,
      date_of_birth,
      password,
      id_user_access_level
    } = req.body;

    const result = await registrationServices.signup(record);
    const { status, data } = result;
    res.status(status).send(data);

  } catch (err) {
    console.log(err)
    if (err.status) {
      return res.status(err.status).send(err);
    } else if (validateErrors > 0) {
      const responses = handler.returner([false, err], api_name, 400)
      res.status(400).send(responses)
    } else {
      return res.status(500).send([]);
    }

  }



}

module.exports = registerSectionHandler;