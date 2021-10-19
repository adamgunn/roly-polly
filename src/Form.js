var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_React$Component) {
    _inherits(Form, _React$Component);

    function Form(props) {
        _classCallCheck(this, Form);

        var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        _this.title_change = _this.title_change.bind(_this);
        _this.comment_change = _this.comment_change.bind(_this);
        return _this;
    }

    _createClass(Form, [{
        key: "title_change",
        value: function title_change(e) {
            this.props.onTitleChange(e);
        }
    }, {
        key: "comment_change",
        value: function comment_change(e) {
            this.props.onCommentChange(e);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "comment_form" },
                React.createElement("input", { className: "title_input", type: "text",
                    placeholder: "Put your title here",
                    onChange: this.title_change }),
                React.createElement("br", null),
                React.createElement("textarea", { className: "content_input",
                    placeholder: "Put your comment here",
                    onChange: this.comment_change })
            );
        }
    }]);

    return Form;
}(React.Component);

Form.propTypes = {
    onTitleChange: propTypes.func,
    onCommentChange: propTypes.func
};

export default Form;