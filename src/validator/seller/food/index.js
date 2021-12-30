const InvariantError = require('../../../exception/InvariantError');
const { FoodPayloadSchema } = require('./schema');

const FoodValidator = {
  validateFoodPayload: (payload) => {
    const validationResult = FoodPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = FoodValidator;
