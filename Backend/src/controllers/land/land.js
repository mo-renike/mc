
const { validationResult } = require('express-validator');

const UploadServices = require('../../services/land/landServices');
const handler = require('../../middleware/handler')
const { ExceptionError } = require('../../../helper/exceptionErrors')
const { landValiditorHandler } = require('../../middleware/validators');



const api_name = "/api/v1/land";
let validateErrors = null;

const landSectionHandler = async (req, res) => {

  try {

    const body = req.body;

    if (!body || JSON.stringify(body) === "{}") {
      throw new ExceptionError([], 'body is empty');
    };

    const all_fields = Object.keys(body);
    const all_values = Object.keys(body);

    await landValiditorHandler(req);
    validateErrors = validationResult(req);

    const required_fields = [
      "max_month",
      "land_price",
      "interest_rate",
      "_id_user",
      "no_estates",
      "land_name"
    ];

    const missing_values = all_values.filter((field) => body[field] === null);
    const missing_fields = required_fields.filter((field) => !all_fields.includes(field));

    if (missing_fields.length > 0) {
      throw new ExceptionError(missing_fields, `${missing_fields} field is missing`);
    }


    if (missing_values.length > 0) {
      const errors = { status: 400 }
      missing_values.forEach((err) => {
        errors[err] = err
      })
      throw new ExceptionError(missing_values, `${missing_values} cannot be null`);
    }

    if (!validateErrors.isEmpty()) {
      let error = {};
      let msg = []
      validateErrors.errors.forEach((err) => {
        error[err.param] = err.msg
        msg = [...msg, err.msg]
      })
      throw new ExceptionError(Object.keys(error).toString(), `${msg}`);
    }

    const {
      interest_rate,
      max_month,
      no_estates,
      land_price,
      land_name,
      _id_user
    } = req.body;

    const record = {
      max_month: parseInt(max_month),
      land_price: parseInt(land_price),
      interest_rate: parseInt(interest_rate),
      _id_user,
      no_estates: parseInt(no_estates),
      land_name

    }

    const result = await UploadServices.uploadLand(record, req);
    const { data, status } = result;
    res.status(status).send(data);

  } catch (err) {
    if (err.status) {
      return res.status(err.status).send(err);
    } else if (validateErrors > 0) {
      const responses = handler.returner([false, err], api_name, 400)
      res.status(400).send(responses)
    } else {
      return res.status(500).send(err);
    }
  }
}

module.exports = { landSectionHandler };