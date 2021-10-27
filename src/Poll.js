var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { useState } from "react";

function Poll(props) {
    var _useState = useState(["#8b0000", "#ffd700", "#006400", "#4169e1"]),
        _useState2 = _slicedToArray(_useState, 2),
        colors = _useState2[0],
        setColors = _useState2[1];

    var _useState3 = useState(props.title),
        _useState4 = _slicedToArray(_useState3, 2),
        title = _useState4[0],
        setTitle = _useState4[1];

    var handleClick = function handleClick(e) {
        props.onVote(e.target.getAttribute("index"));
    };

    function hexToRgb(hex) {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function blackOrWhite(hex) {
        var rgb = hexToRgb(hex);
        return rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114 > 186 ? "#000000" : "#ffffff";
    }

    var bars = [];
    var buttons = [];
    for (var i = 0; i < props.counts.length; i++) {
        bars.push(React.createElement(
            "div",
            { className: "bar_graph_bar_wrapper" },
            React.createElement("div", { style: { backgroundColor: colors[i % colors.length],
                    width: (props.counts[i] === 0 ? 0.5 : props.counts[i] / props.num_votes * 100).toString() + "%" },
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
                    (props.num_votes === 0 ? "0.0" : (props.counts[i] / props.num_votes * 100).toFixed(1).toString()) + "% (" + props.counts[i].toString() + (props.counts[i] === 1 ? " vote)" : " votes)")
                )
            )
        ));
        buttons.push(props.connected_to_server ? React.createElement(
            "button",
            { className: "poll_button", index: i, onClick: handleClick, key: i,
                style: { backgroundColor: colors[i % colors.length] } },
            React.createElement(
                "span",
                { "class": "poll_button_text",
                    style: { color: blackOrWhite(colors[i % colors.length]) } },
                String.fromCharCode(97 + i).toUpperCase()
            )
        ) : React.createElement(
            "button",
            { className: "poll_button_disabled", index: i, key: i },
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
                title
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

export default Poll;