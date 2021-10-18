var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";

var Poll = function (_React$Component) {
    _inherits(Poll, _React$Component);

    function Poll(props) {
        _classCallCheck(this, Poll);

        var _this = _possibleConstructorReturn(this, (Poll.__proto__ || Object.getPrototypeOf(Poll)).call(this, props));

        _this.state = {
            colors: ["darkred", "gold", "darkgreen", "royalblue"],
            title: "Which is the best letter?",
            counts: [0, 0, 0, 0],
            num_votes: 0
        };
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    _createClass(Poll, [{
        key: "handleClick",
        value: function handleClick(e) {
            var counts_state = this.state.counts;
            counts_state[e.target.getAttribute("index")]++;
            this.setState({ counts: counts_state });
            var num_votes_state = this.state.num_votes;
            num_votes_state++;
            this.setState({ num_votes: num_votes_state });
        }
    }, {
        key: "render",
        value: function render() {
            var bars = [];
            var buttons = [];
            for (var i = 0; i < this.state.counts.length; i++) {
                bars.push(React.createElement(
                    "div",
                    { className: "bar_graph_bar_wrapper" },
                    React.createElement("div", { style: { backgroundColor: this.state.colors[i % this.state.colors.length],
                            width: (this.state.counts[i] === 0 ? 0.5 : this.state.counts[i] / this.state.num_votes * 100).toString() + "%" },
                        className: "bar_graph_bar",
                        key: i }),
                    React.createElement(
                        "div",
                        { className: "bar_graph_text" },
                        React.createElement(
                            "div",
                            { className: "choice_letter" },
                            String.fromCharCode(97 + i).toUpperCase()
                        ),
                        React.createElement(
                            "div",
                            { className: "vote_count" },
                            (this.state.num_votes === 0 ? "0.0" : (this.state.counts[i] / this.state.num_votes * 100).toFixed(1).toString()) + "% (" + this.state.counts[i].toString() + (this.state.counts[i] === 1 ? " vote)" : " votes)")
                        )
                    )
                ));
                buttons.push(React.createElement(
                    "button",
                    { className: "poll_button", index: i, onClick: this.handleClick, key: i,
                        style: { backgroundColor: this.state.colors[i % this.state.colors.length] } },
                    String.fromCharCode(97 + i).toUpperCase()
                ));
            }
            return React.createElement(
                "div",
                { className: "poll_wrapper" },
                React.createElement(
                    "div",
                    { className: "bar_graph_wrapper" },
                    React.createElement(
                        "h1",
                        { className: "poll_title" },
                        this.state.title
                    ),
                    bars
                ),
                React.createElement(
                    "div",
                    { className: "poll_buttons_wrapper" },
                    buttons
                )
            );
        }
    }]);

    return Poll;
}(React.Component);

export default Poll;