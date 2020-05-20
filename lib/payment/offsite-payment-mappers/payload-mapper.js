"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectAssign = _interopRequireDefault(require("object-assign"));

var _utils = require("../../common/utils");

var _addressMapper = _interopRequireDefault(require("./address-mapper"));

var _customerMapper = _interopRequireDefault(require("./customer-mapper"));

var _metaMapper = _interopRequireDefault(require("./meta-mapper"));

var _paymentMethodIdMapper = _interopRequireDefault(require("../payment-method-mappers/payment-method-id-mapper"));

var _storeMapper = _interopRequireDefault(require("./store-mapper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PayloadMapper = /*#__PURE__*/function () {
  _createClass(PayloadMapper, null, [{
    key: "create",

    /**
     * @returns {PayloadMapper}
     */
    value: function create() {
      var addressMapper = _addressMapper.default.create();

      var customerMapper = _customerMapper.default.create();

      var metaMapper = _metaMapper.default.create();

      var paymentMethodIdMapper = _paymentMethodIdMapper.default.create();

      var storeMapper = _storeMapper.default.create();

      return new PayloadMapper(addressMapper, customerMapper, metaMapper, paymentMethodIdMapper, storeMapper);
    }
    /**
     * @param {AddressMapper} addressMapper
     * @param {CustomerMapper} customerMapper
     * @param {MetaMapper} metaMapper
     * @param {PaymentMethodIdMapper} paymentMethodIdMapper
     * @param {StoreMapper} storeMapper
     * @returns {Object}
     */

  }]);

  function PayloadMapper(addressMapper, customerMapper, metaMapper, paymentMethodIdMapper, storeMapper) {
    _classCallCheck(this, PayloadMapper);

    /**
     * @private
     * @type {AddressMapper}
     */
    this.addressMapper = addressMapper;
    /**
     * @private
     * @type {CustomerMapper}
     */

    this.customerMapper = customerMapper;
    /**
     * @private
     * @type {MetaMapper}
     */

    this.metaMapper = metaMapper;
    /**
     * @private
     * @type {PaymentMethodIdMapper}
     */

    this.paymentMethodIdMapper = paymentMethodIdMapper;
    /**
     * @private
     * @type {StoreMapper}
     */

    this.storeMapper = storeMapper;
  }
  /**
   * @param {PaymentRequestData} data
   * @returns {Object}
   */


  _createClass(PayloadMapper, [{
    key: "mapToPayload",
    value: function mapToPayload(data) {
      var authToken = data.authToken,
          _data$order = data.order,
          order = _data$order === void 0 ? {} : _data$order,
          _data$payment = data.payment,
          payment = _data$payment === void 0 ? {} : _data$payment,
          _data$paymentMethod = data.paymentMethod,
          paymentMethod = _data$paymentMethod === void 0 ? {} : _data$paymentMethod;
      var payload = (0, _objectAssign.default)({
        amount: order.grandTotal ? order.grandTotal.integerAmount : null,
        bc_auth_token: authToken,
        currency: order.currency,
        gateway: this.paymentMethodIdMapper.mapToId(paymentMethod),
        notify_url: order.callbackUrl,
        order_id: order.orderId ? (0, _utils.toString)(order.orderId) : null,
        page_title: document.title ? document.title : null,
        payment_method_id: paymentMethod.id,
        reference_id: order.orderId ? (0, _utils.toString)(order.orderId) : null,
        return_url: paymentMethod.returnUrl || (order.payment ? order.payment.returnUrl : null)
      }, this.addressMapper.mapToBillingAddress(data), this.customerMapper.mapToCustomer(data), this.metaMapper.mapToMeta(data), this.addressMapper.mapToShippingAddress(data), this.storeMapper.mapToStore(data));
      var _payment$formattedPay = payment.formattedPayload,
          formattedPayload = _payment$formattedPay === void 0 ? {} : _payment$formattedPay;
      (0, _objectAssign.default)(payload, formattedPayload);
      return (0, _utils.omitNil)(payload);
    }
  }]);

  return PayloadMapper;
}();

exports.default = PayloadMapper;
//# sourceMappingURL=payload-mapper.js.map