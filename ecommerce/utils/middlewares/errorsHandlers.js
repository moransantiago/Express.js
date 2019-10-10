const boom = require('boom');

const { config } = require('../../config');
const requestIsAjaxOrApi = require('../../utils/requestIsAjaxOrApi');

withErrorStack = (error, stack) => {
    if (config.dev) {
        return { ...error, stack }  //<--   Object.assign({}, error, stack)
    }
}

logErrors = (error, req, res, next) => {
    console.log(error);
    next(error);
}

wrapErrors = (error, req, res, next) => {
    if (!error.isBoom) {
        next(boom.badImplementation(error))
    }

    next(error);
}

clientErrorHandler = (error, req, res, next) => {
    const {
        output: { statusCode, payload }
    } = error;

    //  Catch errors for AJAX requests or if an error occurs while streaming
    if (requestIsAjaxOrApi(req || res.headersSent)) {
        res.status(statusCode).json(withErrorStack(payload, error.stack));
    } else {
        next(error);
    }
}

errorHandler = (error, req, res, next) => {
    const {
        output: { statusCode, payload }
    } = error;

    if (!config.dev) {
        delete error.stack;
    }

    res.status(statusCode);
    res.render("error", withErrorStack(payload, error.stack));
}

module.exports = {
    logErrors,
    wrapErrors,
    clientErrorHandler,
    errorHandler
}