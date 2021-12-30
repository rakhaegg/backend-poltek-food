const InvariantError = require('../../../exception/InvariantError');
const { ShopPayloadSchema } = require('./schema');

const ShopValidator = {
  validateShopPayload: (payload) => {
    const validationResult = ShopPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ShopValidator;
