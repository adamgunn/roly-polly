var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_React$Component) {
    _inherits(Button, _React$Component);

    function Button(props) {
        _classCallCheck(this, Button);

        var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

        _this.handleButtonClick = _this.handleButtonClick.bind(_this);
        _this.handleClearButtonClick = _this.handleClearButtonClick.bind(_this);
        return _this;
    }

    _createClass(Button, [{
        key: "handleButtonClick",
        value: function handleButtonClick(e) {
            this.props.onButtonClick(e);
        }
    }, {
        key: "handleClearButtonClick",
        value: function handleClearButtonClick(e) {
            this.props.onClearButtonClick(e);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "buttons_wrapper" },
                React.createElement(
                    "button",
                    { className: "add_comment_button", onClick: this.handleButtonClick },
                    "Submit comment"
                ),
                React.createElement(
                    "button",
                    { className: "clear_comments_button", onClick: this.handleClearButtonClick },
                    "Clear"
                )
            );
        }
    }]);

    return Button;
}(React.Component);

Button.propTypes = {
    onButtonClick: propTypes.func,
    onClearButtonClick: propTypes.func
};

export default Button;