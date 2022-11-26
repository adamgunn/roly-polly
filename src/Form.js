var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import propTypes from "prop-types";

var Form = function (_React$Component) {
    _inherits(Form, _React$Component);

    function Form(props) {
        _classCallCheck(this, Form);

        var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        _this.title_change = _this.title_change.bind(_this);
        _this.comment_change = _this.comment_change.bind(_this);
        _this.handleKeyDown = _this.handleKeyDown.bind(_this);
        _this.handleButtonClick = _this.handleButtonClick.bind(_this);
        _this.state = {
            title: '',
            comment: ''
        };
        return _this;
    }

    _createClass(Form, [{
        key: "title_change",
        value: function title_change(e) {
            this.props.onTitleChange(e);
            this.setState({ title: e.target.value });
        }
    }, {
        key: "comment_change",
        value: function comment_change(e) {
            this.props.onCommentChange(e);
            this.setState({ comment: e.target.value });
        }
    }, {
        key: "handleKeyDown",
        value: function handleKeyDown(e) {
            e.target.style.height = 'inherit';
            e.target.style.height = e.target.scrollHeight + "px";
        }
    }, {
        key: "handleButtonClick",
        value: function handleButtonClick(e) {
            this.props.onButtonClick(e);
            if (this.state.title != '' && this.state.comment != '') {
                this.setState({ title: '' });
                this.setState({ comment: '' });
            }
            var textarea = document.getElementById('content_input');
            textarea.style.height = 'inherit';
            textarea.style.height = e.target.scrollHeight + "px";
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "button_and_form_wrapper" },
                React.createElement(
                    "div",
                    { className: "comment_form" },
                    React.createElement("input", {
                        className: "title_input",
                        type: "text",
                        placeholder: "Put your title here",
                        onChange: this.title_change,
                        value: this.state.title
                    }),
                    React.createElement("textarea", {
                        className: "content_input",
                        id: "content_input",
                        placeholder: "Put your comment here",
                        onChange: this.comment_change,
                        onKeyDown: this.handleKeyDown,
                        value: this.state.comment
                    })
                ),
                React.createElement(
                    "div",
                    { className: "buttons_wrapper" },
                    this.props.connected_to_server && this.state.title != '' && this.state.comment != '' ? React.createElement(
                        "button",
                        {
                            className: "add_comment_button",
                            onClick: this.handleButtonClick
                        },
                        "Submit comment"
                    ) : React.createElement(
                        "button",
                        {
                            className: "add_comment_button",
                            onClick: this.handleButtonClick,
                            disabled: true
                        },
                        "Submit comment"
                    )
                )
            );
        }
    }]);

    return Form;
}(React.Component);

Form.propTypes = {
    onTitleChange: propTypes.func,
    onCommentChange: propTypes.func,
    onButtonClick: propTypes.func,
    connected_to_server: propTypes.bool
};

export default Form;