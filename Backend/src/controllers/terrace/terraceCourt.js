
const { validationResult } = require('express-validator');
const multer = require('multer');

const UploadServices = require('../../services/terrace/terraceServices')
const handler = require('../../middleware/handler')
const { ExceptionError } = require('../../../helper/exceptionErrors')
const { terraceCourtValiditorHandler } = require('../../middleware/validators');
const { multerInstance } = require('../../../helper/imageUpload')



const api_name = "/api/v1/terrace/court";
let validateErrors = null;

const terraceCourtSectionHandler = async (req, res) => {


  multerInstance(req, res, async (err) => {

    if (err instanceof multer.MulterError) {
      return res.status(400).send(new ExceptionError([], `Image ${err.message}`.toLocaleLowerCase()))
    } else if (err) {
      return res.status(500).send(new ExceptionError([], `Image ${err.message}`.toLocaleLowerCase(), 500))
    }

    try {

      const body = req.body;

      if (!body || JSON.stringify(body) === "{}") {
        throw new ExceptionError([], 'body is empty');
      };

      const all_fields = Object.keys(body);
      const all_values = Object.keys(body);
      const all_images = Object.keys(req.files);

      await terraceCourtValiditorHandler(req);
      validateErrors = validationResult(req);

      const required_fields = [
        "estate_name",
        "description",
        "court_name",
        "terrace_name",
        "no_unit_available",
        "_id_user",
      ]

      const required_image_fields = [
        "threeD_site_layout",
        "twoD_site_layout"
      ];

      const missing_values = all_values.filter((field) => body[field] === null);
      const missing_fields = required_fields.filter((field) => !all_fields.includes(field));
      const missing_image_fields = required_image_fields.filter((field) => !all_images.includes(field));

      if (missing_fields.length > 0) {
        throw new ExceptionError(missing_fields, `${missing_fields} field is missing`);
      }

      if (missing_image_fields.length > 0) {
        throw new ExceptionError(missing_image_fields, `${missing_image_fields} field is missing`);
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
        terrace_name,
        estate_name,
        description,
        court_name,
        no_unit_available,
        _id_user
      } = req.body;

      const record = {
        terrace_name,
        estate_name,
        description,
        _id_user,
        court_name,
        no_unit_available: parseInt(no_unit_available)
      };

      const result = await UploadServices.uploadCourt(record, req)
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
  })

}

module.exports = { terraceCourtSectionHandler };