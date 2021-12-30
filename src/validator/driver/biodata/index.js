const InvariantError = require('../../../exception/InvariantError');
const { BiodataPayloadSchema } = require('./schema');

const BiodataValidator = {
  validateBiodataPayload: (payload) => {
    const validationResult = BiodataPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = BiodataValidator;