const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const config = require('config');
const shortid = require('shortid')


const { bucket_accessKeyId, bucket_secretAccessKey, bucket } = config.get('databaseConfig');

var s3 = new aws.S3({
  accessKeyId: bucket_accessKeyId,
  secretAccessKey: bucket_secretAccessKey
});

const params = {
  storage: multerS3({
    s3: s3,
    bucket: bucket,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      if (file) {
        cb(null, { fieldName: file.fieldname });
      }
    },
    key: function (req, file, cb) {
      cb(null, `${shortid.generate()}`)
    }
  }),

  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true)
    } else {
      return cb(new Error("Only .png .jpeg and jpg is acceptable"))
    }
  },

  limits: {
    fileSize: 1048576
  }

}

const multerInstance = multer(params).fields([{ name: 'threeD_site_layout', maxCount: 1 }, { name: 'twoD_site_layout', maxCount: 1 }]);

const getImages = (req) => {
  if (req.files) {

    const { threeD_site_layout, twoD_site_layout } = req.files;
    const threeD_site_image = threeD_site_layout ? threeD_site_layout[0]?.location : null;
    const twoD_site_image = twoD_site_layout ? twoD_site_layout[0]?.location : null;

    return {
      threeD_site_image: threeD_site_image,
      twoD_site_image: twoD_site_image
    }
  }

}

module.exports = {
  multerInstance,
  getImages
};