const Joi = require('joi');

const DrinkPayloadSchema = Joi.object({
  name: Joi.string().required(),
  price : Joi.number().required(),
  image : Joi.string().required()

});

module.exports = { DrinkPayloadSchema };