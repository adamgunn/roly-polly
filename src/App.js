var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import Comment from './Comment.js';
import Form from './Form.js';
import Button from './Button.js';
import Poll from './Poll.js';

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.handleButtonClick = _this.handleButtonClick.bind(_this);
    _this.handleTitleChange = _this.handleTitleChange.bind(_this);
    _this.handleCommentChange = _this.handleCommentChange.bind(_this);
    _this.handleClearButtonClick = _this.handleClearButtonClick.bind(_this);

    _this.state = {
      comments: [],
      title_input: '',
      comment_input: '',
      last_title: '',
      last_comment: ''
    };
    return _this;
  }

  _createClass(App, [{
    key: 'handleButtonClick',
    value: function handleButtonClick(e) {
      e.preventDefault();
      var title_input = this.state.title_input;
      var comment_input = this.state.comment_input;
      if (title_input && comment_input && (title_input !== this.state.last_title || comment_input !== this.state.last_comment)) {
        var joined = this.state.comments.concat({ title: this.state.title_input, content: this.state.comment_input });
        this.setState({ comments: joined });
        this.setState({ last_title: title_input });
        this.setState({ last_comment: comment_input });
      } else if (!title_input && comment_input) {
        alert("Please include a title. Otherwise, what are we going to call your comment?");
      } else if (title_input && !comment_input) {
        alert("What comment? You only included a title.");
      } else if (title_input === this.state.last_title && comment_input === this.state.last_comment && title_input && comment_input) {
        alert("Okay, now you're getting a little repetitive...");
      }
    }
  }, {
    key: 'handleTitleChange',
    value: function handleTitleChange(e) {
      this.setState({ title_input: e.target.value });
    }
  }, {
    key: 'handleCommentChange',
    value: function handleCommentChange(e) {
      this.setState({ comment_input: e.target.value });
    }
  }, {
    key: 'handleClearButtonClick',
    value: function handleClearButtonClick(e) {
      e.preventDefault();
      this.setState({ comments: [] });
      this.setState({ last_title: '' });
      this.setState({ last_comment: '' });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'app_wrapper' },
        React.createElement(Poll, null),
        React.createElement(Form, { onTitleChange: this.handleTitleChange, onCommentChange: this.handleCommentChange }),
        React.createElement(Button, { onButtonClick: this.handleButtonClick, onClearButtonClick: this.handleClearButtonClick }),
        React.createElement(
          'div',
          { className: 'comments_container' },
          React.createElement(
            'h1',
            { className: 'comments_header' },
            'Comments'
          ),
          this.state.comments.length === 0 ? React.createElement(
            'p',
            { className: 'no_comments' },
            'No comments? Be the change you want to see in the world...'
          ) : this.state.comments.map(function (comment, index) {
            return React.createElement(Comment, { key: index, title: comment.title, content: comment.content });
          })
        )
      );
    }
  }]);

  return App;
}(React.Component);

export default App;