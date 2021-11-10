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
        var outers = document.getElementsByClassName('radio_outer');
        for (var i = 0; i < outers.length; i++) {
            outers[i].style.border = 'none';
        }
    };

    var handleChoice = function handleChoice(e) {
        var index = e.target.getAttribute('index');
        setSelection(index);
        var selected_option = document.getElementById('radio_label_' + index);
        selected_option.style.backgroundColor = colors[index % colors.length];
        selected_option.style.color = blackOrWhite(colors[index % colors.length]);
        var selected_radio_outline = document.getElementById('radio_outer_' + index);
        selected_radio_outline.style.border = '3px solid ' + blackOrWhite(colors[index % colors.length]);
        var selected_radio_inner = document.getElementById('radio_inner_' + index);
        selected_radio_inner.style.display = 'block';
        selected_radio_inner.style.backgroundColor = blackOrWhite(colors[index % colors.length]);
        var unselected_labels = document.getElementsByClassName('radio_label');
        var unselected_inners = document.getElementsByClassName('radio_inner');
        var unselected_outers = document.getElementsByClassName('radio_outer');
        for (var i = 0; i < props.options.length; i++) {
            if (i != index) {
                unselected_labels[i].style.backgroundColor = 'transparent';
                unselected_labels[i].style.color = 'white';
                unselected_inners[i].style.display = 'none';
                unselected_outers[i].style.border = '3px solid white';
            }
        }
    };

    var bars = [];
    for (var i = 0; i < props.counts.length; i++) {
        bars.push(!props.already_voted ? React.createElement(
            'div',
            {
                className: 'no_vote_option',
                index: i,
                onClick: handleChoice
            },
            React.createElement('input', {
                type: 'radio',
                name: 'option',
                id: 'option_' + i,
                index: i,
                className: 'vote_radio'
            }),
            React.createElement('div', {
                className: 'radio_outer',
                id: 'radio_outer_' + i,
                index: i
            }),
            React.createElement(
                'label',
                {
                    className: 'radio_label',
                    htmlFor: 'option_' + i,
                    id: 'radio_label_' + i,
                    index: i
                },
                props.options[i]
            ),
            React.createElement('div', {
                className: 'radio_inner',
                id: 'radio_inner_' + i,
                index: i,
                style: {
                    backgroundColor: blackOrWhite(props.colors[i % props.colors.length])
                }
            }),
            React.createElement(
                'div',
                { className: 'bar_graph_bar_wrapper ', style: { display: "none" } },
                React.createElement('div', {
                    style: {
                        backgroundColor: colors[i % colors.length],
                        width: 0.5
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
            )
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
        props.connected_to_server ? React.createElement('div', null) : React.createElement(
            'svg',
            {
                width: 32,
                height: 32,
                className: 'not_connected',
                viewBox: '0 0 16 16'
            },
            React.createElement('path', { d: 'M10.706 3.294A12.545 12.545 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c.63 0 1.249.05 1.852.148l.854-.854zM8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065 8.448 8.448 0 0 1 3.51-1.27L8 6zm2.596 1.404.785-.785c.63.24 1.227.545 1.785.907a.482.482 0 0 1 .063.745.525.525 0 0 1-.652.065 8.462 8.462 0 0 0-1.98-.932zM8 10l.933-.933a6.455 6.455 0 0 1 2.013.637c.285.145.326.524.1.75l-.015.015a.532.532 0 0 1-.611.09A5.478 5.478 0 0 0 8 10zm4.905-4.905.747-.747c.59.3 1.153.645 1.685 1.03a.485.485 0 0 1 .047.737.518.518 0 0 1-.668.05 11.493 11.493 0 0 0-1.811-1.07zM9.02 11.78c.238.14.236.464.04.66l-.707.706a.5.5 0 0 1-.707 0l-.707-.707c-.195-.195-.197-.518.04-.66A1.99 1.99 0 0 1 8 11.5c.374 0 .723.102 1.021.28zm4.355-9.905a.53.53 0 0 1 .75.75l-10.75 10.75a.53.53 0 0 1-.75-.75l10.75-10.75z' })
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
                {
                    className: 'vote_button',
                    onClick: handleClick,
                    style: {
                        backgroundColor: colors[selection % colors.length],
                        color: blackOrWhite(colors[selection % colors.length])
                    }
                },
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