import { useState } from 'react';
import blackOrWhite from './blackOrWhite.js';

function Poll(props) {
    var colors = props.colors;

    var handleClick = function handleClick(e) {
        props.onVote(e.target.getAttribute('index'));
    };

    var bars = [];
    var buttons = [];
    for (var i = 0; i < props.counts.length; i++) {
        bars.push(React.createElement(
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
                    String.fromCharCode(97 + i).toUpperCase() + ' - ' + props.options[i]
                ),
                React.createElement(
                    'div',
                    { className: 'vote_count' },
                    (props.num_votes === 0 ? '0.0' : (props.counts[i] / props.num_votes * 100).toFixed(1).toString()) + '% (' + props.counts[i].toString() + (props.counts[i] === 1 ? ' vote)' : ' votes)')
                )
            )
        ));
        buttons.push(props.connected_to_server ? React.createElement(
            'button',
            {
                className: 'poll_button',
                index: i,
                onClick: handleClick,
                key: i,
                style: { backgroundColor: colors[i % colors.length] }
            },
            React.createElement(
                'span',
                {
                    className: 'poll_button_text',
                    index: i,
                    key: i,
                    style: {
                        color: blackOrWhite(colors[i % colors.length])
                    }
                },
                String.fromCharCode(97 + i).toUpperCase()
            )
        ) : React.createElement(
            'button',
            { className: 'poll_button', index: i, key: i, disabled: true },
            String.fromCharCode(97 + i).toUpperCase()
        ));
    }
    return React.createElement(
        'div',
        { className: 'poll_wrapper' },
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
            buttons
        )
    );
}

export default Poll;