const { validationResult } = require('express-validator');

const { userExceptionError } = require('../../../helper/exceptionErrors')
const registrationServices = require('../../services/registration');
const { verificationValiditorHandler } = require('../../middleware/validators');


const api_name = "/api/v1/registration/account/verify";
let validateErrors = null;

const accountVerifyHandler = async (req, res) => {

  try {

    const body = req.body;

    if (!body || JSON.stringify(body) === "{}") {
      throw new userExceptionError([], 'body is empty');
    };

    await verificationValiditorHandler(req);
    validateErrors = validationResult(req);

    const all_fields = Object.keys(body);
    const required_fields = ["verification_code", "user_email"];
    const missing_fields = required_fields.filter((field) => !all_fields.includes(field))

    if (missing_fields.length > 0) {
      throw new userExceptionError(missing_fields, `${missing_fields} field is missing`);
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

    const {
      user_email,
      verification_code
    } = body;

    const credentails = {
      user_email,
      verification_code
    }

    const result = await registrationServices.verifyEmail(credentails);
    const { status, data } = result;
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
module.exports = accountVerifyHandler;