const Joi = require('joi');

const BiodataPayloadSchema = Joi.object({

  no_hp: Joi.string().required(),
  image: Joi.string().required(),
  alamat: Joi.string().required(),
});

module.exports = { BiodataPayloadSchema };