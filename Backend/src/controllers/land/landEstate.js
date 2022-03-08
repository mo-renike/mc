
const { validationResult } = require('express-validator');
const multer = require('multer');

const UploadServices = require('../../services/land/landServices')
const { ExceptionError } = require('../../../helper/exceptionErrors')
const { landEstateValiditorHandler } = require('../../middleware/validators')
const { multerInstance } = require('../../../helper/imageUpload');
const handler = require('../../middleware/handler')

const api_name = "/api/v1/terrace/estate";
let validateErrors = null;

const estateSectionHandler = async (req, res) => {

  multerInstance(req, res, async err => {

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
      const all_images = Object.keys(req.files)

      const required_fields = [
        "land_name",
        "estate_name",
        "location",
        "description",
        "land_size",
        "no_courts",
        "_id_user",
      ]

      const required_image_fields = [
        "threeD_site_layout",
        "twoD_site_layout"
      ]

      await landEstateValiditorHandler(req);
      validateErrors = validationResult(req);


      const missing_values = all_values.filter((field) => body[field] === null);
      const missing_fields = required_fields.filter((field) => !all_fields.includes(field));
      const missing_image_fields = required_image_fields.filter((field) => !all_images.includes(field));

      if (missing_image_fields.length > 0) {
        throw new ExceptionError(missing_image_fields, `${missing_image_fields} field is missing`);
      }

      if (missing_fields.length > 0) {
        throw new ExceptionError(missing_fields, `${missing_fields} field is missing`);
      }

      if (missing_values.length > 0) {
        const errors = { status: 400 };
        missing_values.forEach((err) => {
          errors[err, [...errors]];
        })
        throw new ExceptionError(missing_values, `${missing_values} cannot be null`);
      }

      if (!validateErrors.isEmpty()) {
        let error = {}
        let msg = []
        validateErrors.errors.forEach((err) => {
          error[err.param] = err.msg
          msg = [...msg, err.msg]
        })
        throw new ExceptionError(Object.keys(error).toString(), `${msg}`);
      }

      const {
        land_name,
        estate_name,
        location,
        description,
        _id_user,
        land_size,
        no_courts,
      } = req.body;

      const record = {
        estate_name,
        location,
        description,
        _id_user,
        land_size,
        no_courts,
        land_name
      }

      const result = await UploadServices.uploadEstate(record, req);
      const { data, status } = result;
      res.status(status).send(data);

    } catch (err) {
      if (err.status === 400) {
        return res.send(err);
      } else if (validateErrors?.errors?.length > 0) {
        const responses = handler.returner([false, err], api_name, 400)
        res.status(400).send(responses)
      } else {
        return res.status(500).send(err);
      }

    }

  })

}


const getEstateHandler = async (req, res) => {
  const result = await UploadServices.getEstates();
  const { data, status } = result;
  res.status(status).send(data)
}

module.exports = { estateSectionHandler, getEstateHandler };