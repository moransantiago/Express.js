const joi = require('joi');
const boom = require('boom');

validate = (data, schema) => {
    const { error } = joi.validate(data, schema);
    return error;
}

validationHandler = (schema, check = 'body') => {
    return (req, res, next) => {
        const error = validate(req[check], schema);
        error ? next(boom.badRequest(error)) : next();
    }
}

module.exports = validationHandler;