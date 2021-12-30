const InvariantError = require('../../../exception/InvariantError');
const { DrinkPayloadSchema } = require('./schema');

const DrinkValidator = {
  validateDrinkPayload: (payload) => {
    const validationResult = DrinkPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = DrinkValidator;
