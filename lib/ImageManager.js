'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EMPTY = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC';

var ImageManager = function (_Component) {
  _inherits(ImageManager, _Component);

  function ImageManager(props) {
    _classCallCheck(this, ImageManager);

    var _this = _possibleConstructorReturn(this, (ImageManager.__proto__ || Object.getPrototypeOf(ImageManager)).call(this, props));

    _initialiseProps.call(_this);

    _this.cached = [];
    _this.state = {
      meta: _this.getNewMeta(props)
    };
    return _this;
  }

  _createClass(ImageManager, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var items = this.props.items;

      // Handle Items Change

      if (items !== nextProps.items) {
        // clear cached array
        this.cached = [];
      }

      // Run Everytime
      var meta = this.getNewMeta(nextProps);
      this.setState({ meta: meta });
    }
  }, {
    key: 'render',
    value: function render() {
      var renderedChildren = this.props.children(this.state.meta);
      return renderedChildren && _react2.default.Children.only(renderedChildren);
    }
  }]);

  return ImageManager;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.getNewMeta = function (props) {
    var items = props.items,
        prefetchNext = props.prefetchNext,
        activeIndex = props.activeIndex,
        activeRange = props.activeRange;
    // get boundary

    var boundLeft = activeIndex + activeRange[0];
    var boundRight = activeIndex + activeRange[1];
    // set cached
    items.forEach(function (v, i) {
      if (_lodash2.default.inRange(i, boundLeft, boundRight + 1)) _this2.cached[i] = true;
    });
    // return result
    return items.map(function (src, i) {
      // const isActive = i === activeIndex;
      var isActive = _lodash2.default.inRange(i, boundLeft, boundRight + 1);
      var isPrefetch = !isActive && _lodash2.default.inRange(i, boundLeft, boundRight + prefetchNext + 1);
      var isCached = _this2.cached[i];
      return {
        prefetch: isPrefetch && !isCached ? _react2.default.createElement('link', { rel: 'prefetch', href: src }) : null,
        src: isCached || isActive ? src : EMPTY,
        isActive: isActive
      };
    });
  };
};

exports.default = ImageManager;