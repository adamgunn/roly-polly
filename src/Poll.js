var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { useState } from 'react';
import blackOrWhite from './blackOrWhite.js';

function Poll(props) {
    var colors = props.colors;

    var _useState = useState(null),
        _useState2 = _slicedToArray(_useState, 2),
        selection = _useState2[0],
        setSelection = _useState2[1];

    var handleClick = function handleClick(e) {
        if (selection != null) props.onVote(selection);
    };

    var handleChoice = function handleChoice(e) {
        setSelection(e.target.getAttribute('index'));
    };

    var bars = [];
    for (var i = 0; i < props.counts.length; i++) {
        bars.push(!props.already_voted ? React.createElement(
            'div',
            { className: 'no_vote_option' },
            React.createElement('input', {
                type: 'radio',
                name: 'option',
                id: 'option_' + i,
                index: i,
                onClick: handleChoice,
                className: 'vote_radio'
            }),
            React.createElement(
                'label',
                { className: 'radio_label', htmlFor: 'option_' + i },
                props.options[i]
            ),
            React.createElement('div', { className: 'radio_inner' })
        ) : React.createElement(
            'div',
            { className: 'bar_graph_bar_wrapper ' },
            React.createElement('div', {
                style: {
                    backgroundColor: colors[i % colors.length],
                    width: (props.counts[i] === 0 ? 0.5 : props.counts[i] / props.num_votes * 100).toString() + '%'
                },
                className: 'bar_graph_bar',
                key: i
            }),
            React.createElement(
                'div',
                { className: 'bar_graph_text' },
                React.createElement(
                    'div',
                    { className: 'choice_text' },
                    props.options[i]
                ),
                React.createElement(
                    'div',
                    { className: 'vote_count' },
                    (props.num_votes === 0 ? '0.0' : (props.counts[i] / props.num_votes * 100).toFixed(1).toString()) + '% (' + props.counts[i].toString() + (props.counts[i] === 1 ? ' vote)' : ' votes)')
                )
            )
        ));
    }

    return React.createElement(
        'div',
        { className: 'poll_wrapper' },
        props.connected_to_server ? React.createElement(
            'p',
            { className: 'connected' },
            'Connected'
        ) : React.createElement(
            'p',
            { className: 'not_connected' },
            'Not connected'
        ),
        React.createElement(
            'div',
            { className: 'bar_graph_wrapper' },
            React.createElement(
                'h1',
                { className: 'poll_title' },
                props.title
            ),
            bars
        ),
        React.createElement(
            'div',
            { className: 'poll_buttons_wrapper' },
            props.connected_to_server && !props.already_voted && selection != null ? React.createElement(
                'button',
                { className: 'vote_button', onClick: handleClick,
                    style: { backgroundColor: colors[selection % colors.length],
                        color: blackOrWhite(colors[selection % colors.length]) } },
                'Vote!'
            ) : !props.already_voted ? React.createElement(
                'button',
                { className: 'vote_button', disabled: true },
                'Vote!'
            ) : React.createElement('div', null)
        )
    );
}

export default Poll;