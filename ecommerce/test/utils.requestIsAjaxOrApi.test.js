const assert = require('assert');
const requestIsAjaxOrApi = require('../utils/requestIsAjaxOrApi');

describe('utils - requestIsAjaxOrApi', () => {
    describe('when req accepts html and is not an XMLHtppRequest', () => {
        it('should return false', () => {
            const req = {
                accepts: () => true,
                xhr: false
            };

            const result = requestIsAjaxOrApi(req);
            const expected = false;

            assert.strictEqual(result, expected);
        });
    });

    describe("when req doesn't accept html and is not an XMLHttpRequest", () => {
        it("should return true", () => {
            const req = {
                accepts: () => false,
                xhr: false
            };

            const result = isRequestAjaxOrApi(req);
            const expected = true;

            assert.strictEqual(result, expected);
        });
    });

    describe("when req accepts html and is an XMLHttpRequest", () => {
        it("should return true", () => {
            const req = {
                accepts: () => true,
                xhr: true
            };

            const result = isRequestAjaxOrApi(req);
            const expected = true;

            assert.strictEqual(result, expected);
        });
    });
});