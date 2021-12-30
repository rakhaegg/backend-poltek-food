const Joi = require('joi');

const FoodPayloadSchema = Joi.object({
  name: Joi.string().required(),
  price : Joi.number().required(),
  image : Joi.string().required()
});

module.exports = { FoodPayloadSchema };