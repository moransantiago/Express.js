requestIsAjaxOrApi = req => !req.accepts('html') || req.xhr;

module.exports = requestIsAjaxOrApi;