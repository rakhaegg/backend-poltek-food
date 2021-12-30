const InvariantError = require('../../exception/InvariantError')

const { BuyerPayloadSchema } = require('./schema')

const BuyerValidator = {
    validateBuyerPayload: (payload) => {

        const validationResult = BuyerPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    }
}
module.exports = BuyerValidator;