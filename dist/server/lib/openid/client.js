"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _openid = _interopRequireDefault(require("openid"));

var _util = require("util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = provider => {
  var {
    callbackUrl,
    realm,
    stateless,
    strict,
    extensions
  } = provider;
  var client = new _openid.default.RelyingParty(callbackUrl, realm, stateless, strict, extensions);
  return {
    authenticate: (0, _util.promisify)(client.authenticate).bind(client),
    verifyAssertion: (0, _util.promisify)(client.verifyAssertion).bind(client)
  };
};

exports.default = _default;