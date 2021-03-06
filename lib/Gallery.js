'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _resizeObserverPolyfill = require('resize-observer-polyfill');

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

var _Photo = require('./Photo');

var _Photo2 = _interopRequireDefault(_Photo);

var _utils = require('./utils');

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gallery = function (_React$Component) {
  _inherits(Gallery, _React$Component);

  function Gallery() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Gallery);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Gallery.__proto__ || Object.getPrototypeOf(Gallery)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      containerWidth: 0
    }, _this.handleClick = function (event, _ref2) {
      var index = _ref2.index;
      var _this$props = _this.props,
          photos = _this$props.photos,
          onClick = _this$props.onClick;

      onClick(event, {
        index: index,
        photo: photos[index],
        previous: photos[index - 1] || null,
        next: photos[index + 1] || null
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Gallery, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.observer = new _resizeObserverPolyfill2.default(function () {
        _this2.setState({ containerWidth: Math.floor(_this2._gallery.clientWidth) });
      });
      this.observer.observe(this._gallery);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.observer.disconnect();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props$ImageComponent = this.props.ImageComponent,
          ImageComponent = _props$ImageComponent === undefined ? _Photo2.default : _props$ImageComponent;
      // subtract 1 pixel because the browser may round up a pixel

      var _props = this.props,
          columns = _props.columns,
          margin = _props.margin,
          onClick = _props.onClick,
          direction = _props.direction,
          originalFiles = _props.originalFiles,
          permissionSet = _props.permissionSet;

      var photos = this.props.photos;
      var width = this.state.containerWidth - 1;
      var galleryStyle = void 0,
          thumbs = void 0;

      if (direction === 'row') {
        galleryStyle = { display: 'flex', flexWrap: 'wrap', flexDirection: 'row' };
        thumbs = (0, _utils.computeSizes)({ width: width, columns: columns, margin: margin, photos: photos });
      }
      if (direction === 'column') {
        galleryStyle = { position: 'relative' };
        thumbs = (0, _utils.computeSizesColumns)({ width: width, columns: columns, margin: margin, photos: photos });
        galleryStyle.height = thumbs[thumbs.length - 1].containerHeight;
      }
      return _react2.default.createElement(
        'div',
        { className: 'react-photo-gallery--gallery' },
        _react2.default.createElement(
          'div',
          { ref: function ref(c) {
              return _this3._gallery = c;
            }, style: galleryStyle },
          thumbs.map(function (photo, index) {
            var left = photo.left,
                top = photo.top,
                containerHeight = photo.containerHeight,
                rest = _objectWithoutProperties(photo, ['left', 'top', 'containerHeight']);

            var originalFile = _.find(_.compact(originalFiles), function (file) {
              return file.id === photo.key;
            });
            return _react2.default.createElement(ImageComponent, {
              key: photo.key || photo.src,
              margin: margin,
              index: index,
              photo: rest,
              originalFile: originalFile,
              permissionSet: permissionSet,
              direction: direction,
              left: left,
              top: top,
              onClick: onClick ? _this3.handleClick : null
            });
          })
        )
      );
    }
  }]);

  return Gallery;
}(_react2.default.Component);

Gallery.propTypes = {
  photos: _propTypes2.default.arrayOf(_Photo.photoPropType).isRequired,
  originalFiles: _propTypes2.default.arrayOf(Object).isRequired,
  permissionSet: _propTypes2.default.object.isRequired,
  direction: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  columns: _propTypes2.default.number,
  margin: _propTypes2.default.number,
  ImageComponent: _propTypes2.default.func
};

Gallery.defaultProps = {
  columns: 3,
  margin: 2,
  direction: 'row'
};

exports.default = Gallery;