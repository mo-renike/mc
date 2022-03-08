
const { validationResult } = require('express-validator');

const UploadServices = require('../../services/terrace/terraceServices')
const handler = require('../../middleware/handler')
const { ExceptionError } = require('../../../helper/exceptionErrors')
const { terraceValiditorHandler } = require('../../middleware/validators');


const api_name = "/api/v1/terrace";
let validateErrors = null;

const terraceSectionHandler = async (req, res) => {

  try {

    const body = req.body;

    if (!body || JSON.stringify(body) === "{}") {
      throw new ExceptionError([], 'body is empty');
    };

    const all_fields = Object.keys(body);
    const all_values = Object.keys(body);

    await terraceValiditorHandler(req);
    validateErrors = validationResult(req);

    const required_fields = [
      "terrace_price",
      "max_month",
      "_id_user",
      "terrace_name",
      "interest_rate",
      "no_estates"
    ]

    const missing_values = all_values.filter((field) => body[field] === null);
    const missing_fields = required_fields.filter((field) => !all_fields.includes(field));

    if (missing_fields.length > 0) {
      throw new ExceptionError(missing_fields, `${missing_fields} field is missing`);
    }


    if (missing_values.length > 0) {
      const errors = { status: 400 };
      missing_values.forEach((err) => {
        errors[err] = err
      })
      throw new ExceptionError(missing_values, `${missing_values} cannot be null`);
    }

    if (!validateErrors.isEmpty()) {
      let error = {};
      let msg = [];
      validateErrors.errors.forEach((err) => {
        error[err.param] = err.msg
        msg = [...msg, err.msg]
      })
      throw new ExceptionError(Object.keys(error).toString(), `${msg}`);
    }

    const {
      terrace_name,
      no_estates,
      terrace_price,
      max_month,
      _id_user,
      interest_rate,
    } = req.body;

    const record = {
      terrace_name,
      terrace_price: parseInt(terrace_price),
      max_month: parseInt(max_month),
      _id_user,
      interest_rate: parseInt(interest_rate),
      no_estates: parseInt(no_estates)
    }

    const result = await UploadServices.uploadTerrace(record, req)
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

module.exports = { terraceSectionHandler };