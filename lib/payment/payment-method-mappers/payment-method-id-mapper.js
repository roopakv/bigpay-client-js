"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _paymentMethodTypes = require("../payment-method-types");

var _paymentMethodIds = require("../payment-method-ids");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @param {string} id
 * @return {Boolean}
 */
function isBraintreePaymentMethod(id) {
  switch (id) {
    case _paymentMethodIds.BRAINTREE_PAYPAL:
    case _paymentMethodIds.BRAINTREE_PAYPAL_CREDIT:
    case _paymentMethodIds.BRAINTREE_VISACHECKOUT:
    case _paymentMethodIds.BRAINTREE_GOOGLEPAY:
      return true;

    default:
      return false;
  }
}
/**
 * @param {string} id
 * @return {Boolean}
 */


function isPaypalCommercePaymentMethod(id) {
  return id === _paymentMethodIds.PAYPAL_COMMERCE_CREDIT;
}

var PaymentMethodIdMapper = /*#__PURE__*/function () {
  function PaymentMethodIdMapper() {
    _classCallCheck(this, PaymentMethodIdMapper);
  }

  _createClass(PaymentMethodIdMapper, [{
    key: "mapToId",

    /**
     * @param {PaymentMethod} paymentMethod
     * @returns {string}
     */
    value: function mapToId(paymentMethod) {
      var id = paymentMethod.id;

      if (paymentMethod.method === _paymentMethodTypes.MULTI_OPTION) {
        id = paymentMethod.gateway;
      }

      if (isBraintreePaymentMethod(id)) {
        return _paymentMethodIds.BRAINTREE;
      }

      if (isPaypalCommercePaymentMethod(id)) {
        return _paymentMethodIds.PAYPAL_COMMERCE;
      }

      return id;
    }
  }], [{
    key: "create",

    /**
     * @returns {PaymentMethodIdMapper}
     */
    value: function create() {
      return new PaymentMethodIdMapper();
    }
  }]);

  return PaymentMethodIdMapper;
}();

exports.default = PaymentMethodIdMapper;
//# sourceMappingURL=payment-method-id-mapper.js.map